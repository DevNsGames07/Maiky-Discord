const { Client, Guild, ChannelType, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "guildCreate",
    /**
     * 
     * @param {Guild} guild 
     * @param {Client} client 
     */
    async execute(guild, client) {

        const Channel = await guild.channels.create({
            name: `${client.user.username}-setup`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ["ViewChannel"]
                },
                {
                    id: client.user.id,
                    allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
                },
            ]
        })

        // Embed

        const botenterembed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`})
        .setDescription(`Thank for invite **${client.user.username}**!\n\n **Language:**\nDo you want to change the bot languange to Dutch for you server? then do this with this command **\`/setup-language\`**`)
        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        Channel.send({  embeds: [botenterembed] })
        console.log(` Make a ${Channel.name} in ${guild.name} `)

        

    }
}