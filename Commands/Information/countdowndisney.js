const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('disneycount')
    .setDescription('Disneycount!'),
  async execute(interaction, client) {
    const userId = '441609655786143754';
    const user = await client.users.fetch(userId);

    if (user) {
        user.send('Hey Niek je gaat over 2 weken naar Disney.')
            .then(() => console.log('Bericht verzonden'))
            .catch(console.error);
    } else {
        console.log('Gebruiker niet gevonden.');
    }
  },
};
