const express = require('express')
const app = express()
const mongoose = require('mongoose')
const suggestionRouter = require('./routes/suggestion')
const messageRouter = require('./routes/message')
const userModel = require('./models/user')
app.use(express.json())



// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// connexion à la base de données
mongoose.connect('mongodb://127.0.0.1:27017/chat');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Connected to MongoDB!')})

  app.use('/api/suggestion', suggestionRouter);
  app.use('/api/message', messageRouter)
 

module.exports = app