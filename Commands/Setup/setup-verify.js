const { SlashCommandBuilder, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const VerifySchema = require("../../Models/guild-verfiy")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-verify')
    .setDescription('Setup a Verify System!')
    .addRoleOption(option =>
        option.setName("role")
        .setDescription("Give a role that person get when he is verified!")
        .setRequired(true))
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("Give channel for the verify message!")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
  async execute(interaction, client) {

    const { options, user, guild } = interaction;
    
    const VerifyRole = options.getRole("role")
    const VerifyChannel = options.getChannel("channel")

    await VerifySchema.findOneAndUpdate(
        { Guild: guild.id },
        {
            Role: VerifyRole.id,
        },
        {
            new: true,
            upsert: true
        }
    )

    const verifyembed = new EmbedBuilder()
        .setTitle("**Verify System**")
        .setColor("White")
        .setDescription(`Click on the button below to verify yourself`)
        .setThumbnail(guild.iconURL())
    
    const Verifybutton = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId("verify")
            .setLabel("Verify")
            .setStyle(ButtonStyle.Success)

    )

    const embedsuccessetverify = new EmbedBuilder()
        .setColor("White")
        .setDescription(`Succesfully setting up the verify system to ${VerifyChannel}, with the role: ${VerifyRole}`)

    interaction.reply({ embeds: [embedsuccessetverify] })

    return VerifyChannel.send({ embeds: [ verifyembed], components: [Verifybutton] })
  },
};