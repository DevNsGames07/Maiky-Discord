const { SlashCommandBuilder, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const CaptchaSchema = require("../../Models/guild-captcha")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-captcha')
        .setDescription('Setup a Captcha System!')
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

        const { options, user, guild, member } = interaction;
        const CaptchaRole = options.getRole("role")
        const CaptchaChannel = options.getChannel("channel")

        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const geenpermsforthecmd = new EmbedBuilder()
                .setColor("White")
                .setDescription(`Je hebt geen permissie om dit commando in deze server uit te voeren!`)
            interaction.reply({ embeds: [geenpermsforthecmd], flags: MessageFlags.Ephemeral })
        }

        await CaptchaSchema.findOneAndUpdate(
            { Guild: guild.id },
            {
                Role: CaptchaRole.id,
                Channel: CaptchaChannel.id
            },
            {
                new: true,
                upsert: true
            }
        )

        const captchaembed = new EmbedBuilder()
            .setTitle("**Captcha System**")
            .setColor("White")
            .setDescription(`Click on the button below todo the captcha`)
            .setThumbnail(guild.iconURL())

        const Captchabutton = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("captcha-systeem")
                .setLabel("Captcha")
                .setStyle(ButtonStyle.Primary)

        )

        const embedsuccessetCaptcha = new EmbedBuilder()
            .setColor("White")
            .setDescription(`Succesfully setting up the Captcha system to ${CaptchaChannel}, with the role: ${CaptchaRole}`)

        interaction.reply({ embeds: [embedsuccessetCaptcha] })

        return CaptchaChannel.send({ embeds: [captchaembed], components: [Captchabutton] })
    },
};