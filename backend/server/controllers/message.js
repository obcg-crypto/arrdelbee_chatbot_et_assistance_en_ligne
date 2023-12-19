const Message = require("../models/message")

exports.postMessage = (req, res, next) => {
    delete req.body._id
    const message = new Message({
        ...req.body
    })
    message.save()
    .then(() => res.status(201).json({message:'Save message !!'}))
    .catch((error) => {
        console.log(error)
        res.status(400).json({error})
    })
};

exports.getAllMessage = (req, res, next) =>{
    Message.find()
    .populate('sender receiver')
    .then(message => res.status(200).json({message}))
    .catch(error => res.status(400).json({error})) 
 }

 exports.getUserMessage = (req, res, next) =>{
    delete req.body._id
    Message.find({$or: [{ sender: req.body.userId }, { receiver:req.body.userId }]})
    .populate('sender receiver')
    .then(usermessage => res.status(200).json({usermessage}))
    .catch(error => res.status(400).json({error})) 
 }
 