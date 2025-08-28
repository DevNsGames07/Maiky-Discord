const mongoose = require("mongoose");

const captchaguild = new mongoose.Schema({
    Guild: String,
    Role: String,
    Channel: String
});

module.exports = mongoose.model("GuildCaptcha(Maiky)", captchaguild);