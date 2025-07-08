const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Handler
const { loadCommands } = require("./Handlers/cmd-handler")
const { loadEvents } = require("./Handlers/event-handler")

client.once('ready', async () => {
    console.log(`${client.user.tag} was logged in and is ready for use!`);
});

client.login(process.env.TOKEN).then(() => {
    loadCommands(client);
    loadEvents(client);
})