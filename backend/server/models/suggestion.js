const mongoose = require("mongoose")

const SuggestionSchema = mongoose.Schema({
    message: {type:String, require:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    date : {type : String, require:true}
});

module.exports = mongoose.model('Suggestion', SuggestionSchema)