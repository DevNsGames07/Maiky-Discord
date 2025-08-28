const mongoose = require("mongoose");

const captchauser = new mongoose.Schema({
    Guild: String,
    User: String,
    Code: String
});

module.exports = mongoose.model("UserCaptch(Maiky)", captchauser);