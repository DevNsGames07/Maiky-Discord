const mongoose = require("mongoose");

const guildlanguage = new mongoose.Schema({
    Guild: String,
    Language: String,
});

module.exports = mongoose.model("Guildlanguage(Maiky)", guildlanguage);