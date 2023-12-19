const mongoose = require("mongoose")

const SuggestionSchema = mongoose.Schema({
    message: {type:String, require:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    date : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Suggestion', SuggestionSchema)