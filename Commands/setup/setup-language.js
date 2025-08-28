const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Language = require("../../Models/guild-language");
const Languageschema = require("../../Models/guild-language");
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
    .setName('setup-language')
    .setDescription('Setup language for in you server!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option.setName('langauge')
        .setDescription('Give you guild language')
        .setRequired(true)
        .addChoices(
          { name: 'Netherlands', value: 'Dutch' },
          { name: 'English', value: 'English' },
          { name: 'French', value: 'French' },
          { name: 'Spanish', value: 'Spanish' }
        )
    ),
  async execute(interaction, client) {

    const { options, guildId, member } = interaction;

    const data = await Language.findOne({ Guild: guildId });
    const language = data && data.Language in i18next.options.resources ? data.Language : process.env.defaultLanguage;
    i18next.changeLanguage(language);

    const languages = options.getString("langauge")


    await Languageschema.findOneAndUpdate(
      { Guild: guildId },
      {
        Language: languages.toLowerCase()
      },
      {
        new: true,
        upsert: true
      }
    )

    const embedje2 = new EmbedBuilder()
      .setColor("White")
      .setDescription(`The bot language has been changed to **${languages}**`)

    await interaction.reply({ embeds: [embedje2] });


  },
};
