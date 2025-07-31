const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction, client) {

    const embedje = new EmbedBuilder()
    .setColor("White")
    .setDescription(`Pinging....`)
    .setFooter({ text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()

    const sent = await interaction.reply({ embeds: [embedje], flags: MessageFlags.Ephemeral })

    const embedje2 = new EmbedBuilder()
    .setColor("White")
    .setDescription(`Latency: ${client.ws.ping}ms`)
    .setFooter({ text: `Powered sby ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()

    interaction.editReply({ embeds: [embedje2], flags: MessageFlags.Ephemeral });


  },
};
