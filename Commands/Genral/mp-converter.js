const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ActionRowBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert mp3 or mp4')
    .addSubcommand(subcommand =>
		subcommand
			.setName('mp3')
			.setDescription('Covert a mp3')
			.addStringOption( option =>
                option.setName('mp3link')
                .setDescription('Give the video id')
                .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('mp4')
			.setDescription('Covert a mp4')
			.addStringOption( option =>
                option.setName('mp4link')
                .setDescription('Give the video id')
                .setRequired(true)
            )
    ),
  async execute(interaction, client) {

    const { options } = interaction;
    const sub = options.getSubcommand()
    const mp3input = options.getString("mp3link");
    await interaction.deferReply({ flags: MessageFlags.Ephemeral})
    switch (sub) {
        case "mp3":
            const options = {
                method: 'GET',
                url: 'https://youtube-mp36.p.rapidapi.com/dl',
                params: {id: `${mp3input}`},
                headers: {
                    'x-rapidapi-key': 'f4ec76bf05msh19e7bbb3d77be64p1aa621jsnaf58f15ea9d1',
                    'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
                }
            };
        try {
            const response = await axios.request(options);
            console.log(response.data);

            
                const mp3button = new ButtonBuilder()
                    .setLabel('⬇️Download')
                    .setURL(`${response.data.link}`)
                    .setStyle(ButtonStyle.Link);

                const embedjemp3 = new EmbedBuilder()
                .setColor("White")
                .setTitle("MP3 converter")
                .setDescription(`Click on the button below the message for download`)

                const rowmp3 = new ActionRowBuilder()
                    .addComponents(mp3button);

                interaction.editReply({ embeds: [embedjemp3], components: [rowmp3]});

        } catch (error) {
                const embedjemp3error = new EmbedBuilder()
                .setColor("White")
                .setTitle("URL niet gevonden")
                .setDescription(`Ga de video die je wilt downloaden kopieer de url uit de zoekbalk \`https://www.youtube.com/watch?v=videoid\``)

                interaction.editReply({ embeds: [embedjemp3error] });
        }
    }
    

  },
};
