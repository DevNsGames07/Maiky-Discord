

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        const { commandName } = interaction;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);
            if (!command) {
                if (!command) interaction.reply({ text: "Er is een error onstaan bij het runnen van het command!", ephemeral: true }) && console.log(`Er is een fout bij het runnen van het command ${commandName}`) && client.commands.delete(commandName)
            }
            command.execute(interaction, client);
        }
    }
}