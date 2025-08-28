const { EmbedBuilder, MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const VerifySchema = require("../../Models/guild-verfiy");
const CaptchaSchema = require("../../Models/guild-captcha")
const UserCaptcha = require("../../Models/user-captcha");
const { CaptchaGenerator } = require('captcha-canvas');
const fs = require("fs");
module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        const { commandName, customId, guild, member, user } = interaction;

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
            if (interaction.customId == "captcha-systeem") {

                const options = { height: 200, width: 600 };  //options for captcha image
                const captcha = new CaptchaGenerator(options); //getting captcha constructo
                const buffer = await captcha.generate();

                const Captchabuttonmodal = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("captcha-openmodal")
                        .setLabel("⚠️Slove")
                        .setStyle(ButtonStyle.Danger)
                )

                interaction.reply({ files: [buffer], components: [Captchabuttonmodal], flags: MessageFlags.Ephemeral })
                console.log(captcha.text);

                await UserCaptcha.findOneAndUpdate(
                    { Guild: guild.id },
                    {
                        User: user.id,
                        Code: captcha.text
                    },
                    {
                        new: true,
                        upsert: true
                    }
                )

            }
            if (interaction.customId == "captcha-openmodal") {

                const modal = new ModalBuilder()
                    .setCustomId('captchamodal')
                    .setTitle("Check the image below the modal");

                const captchatext = new TextInputBuilder()
                    .setCustomId('captchatext')
                    .setLabel("Type here your captcha code")
                    .setStyle(TextInputStyle.Short);

                const captchacode = new ActionRowBuilder().addComponents(captchatext);
                modal.addComponents(captchacode);
                await interaction.showModal(modal);
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId == "captchamodal") {

                const UserCapthacode = UserCaptcha.findOne({ Guild: guild.id, User: user.id})
                const interactioncaptchacode = interaction.fields.getTextInputValue('captchatext');

                if (interactioncaptchacode !== UserCapthacode) {
                        const captchaverifyRole = await CaptchaSchema.findOne({ Guild: guild.id })
                        const role = guild.roles.cache.get(captchaverifyRole.Role)

                        if (role) {
                            member.roles.add(role)
                            await UserCapthacode.deleteOne()
                            const succescaptchaembed = new EmbedBuilder()
                            .setColor("Green")
                            .setDescription("✅You have succesfully verify yourself with captcha!")
                            interaction.reply({ embeds: [succescaptchaembed], flags: MessageFlags.Ephemeral })

                        } else {
                            const problemaddrolecaptchaEmbed = new EmbedBuilder()
                                .setColor("Green")
                                .setDescription(`Er is probleem gevonden de rol die jij moet krijgen bestaat niet meer in de server contacteer de eigenaar van de server!`)
                                .setTimestamp();
                            interaction.reply({ embeds: [problemaddrolecaptchaEmbed], flags: MessageFlags.Ephemeral })

                        }
                } else {

                    const tryagaincaptcha = new EmbedBuilder()
                    .setDescription("⚠️That was wrong! Try Again!")
                    interaction.reply({ embeds: [tryagaincaptcha], flags: MessageFlags.Ephemeral })
                }
            } 
        }
    }
}