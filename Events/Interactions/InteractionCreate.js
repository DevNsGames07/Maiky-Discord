const { EmbedBuilder, MessageFlags } = require("discord.js");
const VerifySchema = require("../../Models/guild-verfiy")

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        const { commandName, customId, guild, member} = interaction;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);
            if (!command) {
                if (!command) interaction.reply({ text: "Er is een error onstaan bij het runnen van het command!", flags: MessageFlags.Ephemeral }) && console.log(`Er is een fout bij het runnen van het command ${commandName}`) && client.commands.delete(commandName)
            }
            command.execute(interaction, client);
        }

        if (interaction.isButton()) {
             if (interaction.customId == "verify") {
                const verifyrole = await VerifySchema.findOne({ Guild: guild.id })
                const role = guild.roles.cache.get(verifyrole.Role)

                if (role) {
                    const roleName = role.name;
                    member.roles.add(role)
                    const addRoleEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`Je heb de rol **${roleName}** gekregen!`)

                    interaction.reply({ embeds: [addRoleEmbed], flags: MessageFlags.Ephemeral })
                } else {
                    const problemaddroleEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`Er is probleem gevonden de rol die jij moet krijgen bestaat niet meer in de server contacteer de eigenaar van de server!`)

                    interaction.reply({ embeds: [problemaddroleEmbed], flags: MessageFlags.Ephemeral })
                
                }
             }


        }
    }
}