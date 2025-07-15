const { Client, ActivityType } = require("discord.js")
const mongoose = require("mongoose")

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        console.log(`${client.user.tag} was logged in and is ready for use!`);

        client.user.setPresence({ activities: [{ name: 'Maiky' }] });

        try {
            await mongoose.connect(process.env.MONGODB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to the database");
        } catch (error) {
            console.error('COULD NOT CONNECT TO DATABASE:', error.message);
        }
    }
}