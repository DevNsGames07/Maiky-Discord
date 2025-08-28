const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
const client = new Client({ intents: 
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ] 
});

client.commands = new Collection();
// Handler
const { loadCommands } = require("./Handlers/cmd-handler")
const { loadEvents } = require("./Handlers/event-handler")

client.login(process.env.TOKEN).then(() => {
    loadCommands(client);
    loadEvents(client);
})