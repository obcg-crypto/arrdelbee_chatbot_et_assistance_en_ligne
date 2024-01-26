const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    content : {type:String, require:true},
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    receiver : {type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    date : {type: String}
});

module.exports = mongoose.model('Message', messageSchema);