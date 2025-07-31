const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("simulate")
    .setDescription("Complete music system")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
        subcommand.setName("options")
        .setDescription("Select an option")
        .addStringOption(option =>
            option.setName("options")
                .setDescription("Select an option")
                .setRequired(true)
                .addChoices(
                    { name: "Join", value: "join" },
                    { name: "Leave", value: "leave"  },
                )
        )
    ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute (interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, user, member } = interaction

        const Options = options.getString("options")

        if (user.id !== "441609655786143754") return interaction.editReply({ content: `This command is classified!`})

        switch (Options) {

            case "join": {
                interaction.editReply({ content: `Simulated Join Event`})

                client.emit("guildMemberAdd", member)
            }

                break;

            case "leave": {
                interaction.editReply({ content: `Simulated Leave Events`})


                client.emit("guildMemberRemove", member)

            }
                break;

        }
    }
}