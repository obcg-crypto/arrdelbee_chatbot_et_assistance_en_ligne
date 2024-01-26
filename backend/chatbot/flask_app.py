from flask import Flask, render_template, request, jsonify
import nltk
import json
import random
import numpy as np
from nltk.stem import WordNetLemmatizer
import pickle
from keras.models import load_model
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'






# Configuration de la connexion à MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/chatbot" # Remplacez 'yourDatabase' par le nom de votre base de données
mongo = PyMongo(app)

@app.route('/save_conversation', methods=['POST'])
def save_conversation():
    data = request.json
    
    # Validation des données reçues
    if not data or 'user_input' not in data or 'bot_response' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    # Enregistrement des données dans MongoDB
    try:
        mongo.db.conversations.insert_one(data)
        return jsonify({'message': 'Conversation saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500




model = load_model('chatbot_model.h5')
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read()) # encoding='utf-8'
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))



@app.route("/")
def home():
    return render_template("home.html")

@app.route("/process", methods=['POST'])
def process():
    user_input = request.form['user_input']
    bot_response = get_bot_response(user_input)
    return render_template("home.html", user_input=user_input, bot_response=bot_response)


# Les routes pour l'API

@app.route("/api/chat", methods=['POST'])
@cross_origin()
def chat_api():
    data = request.get_json()
    user_input = data['user_input']
    bot_response = get_bot_response(user_input, show_details=False)
    response_data = {"user_input": user_input, "bot_response": bot_response}

    return jsonify(response_data)



def get_bot_response(userText, show_details=False):
    # Tokenize the pattern - split words into an array
    sentence_words = nltk.word_tokenize(userText)
    # Lemmatize each word - create a short form for the word
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]

    # Bag of words - matrix of N words, vocabulary matrix
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # Assign 1 if the current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    p = np.array(bag)

    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # Sort by the strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})

    ints = return_list
    tag = ints[0]['intent']
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result.lower()

if __name__ == "__main__":
    app.run()