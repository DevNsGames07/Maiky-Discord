const { Client, GuildMember, EmbedBuilder } = require("discord.js")
const WelcomeSchema = require("../../Models/guild-welcome")

module.exports = {
    name: "guildMemberAdd",

    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {

        const { user, guild } = member;
        const Data = await WelcomeSchema.findOne({ Guild: guild.id }).catch(err => { })
        if (!Data) return

        const WelcomeMessage = `test`

        if (Data.Channel !== null) {
            
            const Channel = guild.channels.cache.get(Data.Channel)
            if (!Channel) return

            Channel.send({ content: `${WelcomeMessage}`})
        }



    }
}