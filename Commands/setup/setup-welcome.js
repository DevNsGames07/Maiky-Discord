const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const WelcomeSchema = require("../../Models/guild-welcome")
const Language = require("../../Models/guild-language");
const i18next = require("i18next")
const fs = require("fs")
i18next.init({
  lng: process.env.defaultLanguage,
  fallbackLng: process.env.defaultLanguage,
  resources: {
    french: {
      translation: JSON.parse(fs.readFileSync('./translation/fr.json', 'utf8')),
    },
    english: {
      translation: JSON.parse(fs.readFileSync('./translation/en.json', 'utf8')),
    },
    spanish: {
      translation: JSON.parse(fs.readFileSync('./translation/es.json', 'utf8')),
    },
    dutch: {
      translation: JSON.parse(fs.readFileSync('./translation/nl.json', 'utf8')),
    }
  },
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-welcome')
    .setDescription('Setup Weclome systeem for in you server!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("Give a channel for the welcome system.")
        .setRequired(true)
    ),
  async execute(interaction, client) {

        const { options, guildId } = interaction;

        const data = await Language.findOne({ Guild: guildId });
        const language = data && data.Language in i18next.options.resources ? data.Language : process.env.defaultLanguage;
        i18next.changeLanguage(language);

        const welcomechannel = options.getChannel("channel")

        await WelcomeSchema.findOneAndUpdate(
            { Guild: guildId },
            {
                Channel: welcomechannel.id
            },
            {
                new: true,
                upsert: true
            }
        )


        let succesmessagewelcome = (i18next.t('setupwelcome'))
            .replace("<setwelcomechannel>", `**${welcomechannel}**`)

        const embedje2 = new EmbedBuilder()
        .setColor("White")
        .setDescription(`${succesmessagewelcome}`)

        await interaction.reply({ embeds: [embedje2] });


  },
};
