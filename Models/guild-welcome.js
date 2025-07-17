const mongoose = require("mongoose");

const guildWelcome = new mongoose.Schema({
    Guild: String,
    Channel: String,
});

module.exports = mongoose.model("GuildWelcome(Maiky)", guildWelcome);