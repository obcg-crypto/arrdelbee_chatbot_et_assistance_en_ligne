const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    nom: {type:String, require:true},
    statut: {type:String, require:true}
});

module.exports = mongoose.model('User', UserSchema)