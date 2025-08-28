const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionsBitField } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member out the server')
    .addUserOption(option =>
        option.setName("user")
        .setDescription("Give a user to kick out the server")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("reason")
        .setDescription("Give a reason for the kick")
        .setRequired(false)),
  async execute(interaction, client) {

    const { options, member} = interaction;

    const usertokick = options.getMember("user");
    const userkickreason = options.getString("reason") || "no reason";
    
    if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        const geenpermsforkick = new EmbedBuilder()
        .setColor("White")
        .setDescription(`Je hebt geen permissies om mensen te kicken uit de server!`)
        interaction.reply({ embeds: [geenpermsforkick], flags: MessageFlags.Ephemeral })
    }

      const geenpermsforkick2 = new EmbedBuilder()
        .setColor("White")
        .setDescription(`Je hebt geen permissie om dit persoon te kicken uit de server`)
    if (usertokick.roles.highest.position >= member.roles.highest.position)
        interaction.reply({ embeds: [geenpermsforkick2], flags: MessageFlags.Ephemeral })
    await member.kick(userkickreason);

    
    
  },
};
