const mongoose = require("mongoose");

const verifyguild = new mongoose.Schema({
    Guild: String,
    Role: String,
    Channel: String
});

module.exports = mongoose.model("GuildVerify(Maiky)", verifyguild);