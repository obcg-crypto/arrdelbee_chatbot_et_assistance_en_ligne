const Suggestion = require('../models/suggestion')

exports.postSuggestion = (req, res, next) => {
    delete req.body._id
    const suggestion = new Suggestion({
        ...req.body
    })
    suggestion.save()
    .then(() => res.status(201).json({message:'Save suggestion !!'}))
    .catch((error) => {
        console.log(error)
        res.status(400).json({error})
    })
}

exports.getAllSuggestion = (req, res, next) =>{
    Suggestion.find()
    .populate("user")
    .then(suggestion => res.status(200).json({suggestion}))
    .catch(error => res.status(400).json({error})) 
 }
 