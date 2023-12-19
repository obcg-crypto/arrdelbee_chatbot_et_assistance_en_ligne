const express = require('express')
const app = express()
const mongoose = require('mongoose')
const suggestionRouter = require('./routes/suggestion')
const messageRouter = require('./routes/message')
const userModel = require('./models/user')
app.use(express.json())

// connexion à la base de données
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Connected to MongoDB!')})

  app.use('/api/suggestion', suggestionRouter);
  app.use('/api/message', messageRouter)
 

module.exports = app