const { Client, ChannelType, GatewayIntentBits } = require('discord.js');
const SoftUI = require('dbd-soft-ui');
let DBD = require('discord-dashboard');
require('dotenv').config()
const WelcomeSchema = require("../../Models/guild-welcome")
const Handler = new DBD.Handler(
    /*
            Keyv storage instance
            Example: { store: new KeyvMongo('mongodb://user:pass@localhost:27017/dbname') }

            Can be left empty to use the default storage (Keyv with SQLite)
        */
);

module.exports = {
    name: "ready",

    /**
     * @param {Client} client 
     */
    async execute(client) {

        await DBD.useLicense(process.env.dbdlicense);
        DBD.Dashboard = DBD.UpdatedClass();

        const Dashboard = new DBD.Dashboard({
            port: 80,
            client: {
                id: process.env.clientid,
                secret: process.env.clientsecret
            },
            redirectUri: `http://localhost/discord/callback`,
            domain: "http://localhost",
            ownerIDs: "441609655786143754",
            useThemeMaintenance: true,
            useTheme404: true,
            bot: client,
            guildAfterAuthorization: {
                use: true,
                guildId: "1220676713680343123",
            },
            theme: SoftUI({
                storage: Handler,
                customThemeOptions: {
                    index: async ({ req, res, config }) => {
                        return {
                            values: [],
                            graph: {},
                            cards: [],
                        }
                    },
                },
                websiteName: "Assistants",
                colorScheme: "pink",
                supporteMail: "support@support.com",
                icons: {
                    favicon: 'https://assistantscenter.com/wp-content/uploads/2021/11/cropped-cropped-logov6.png',
                    noGuildIcon: "https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-nnt62s2u.png",
                    sidebar: {
                        darkUrl: 'https://assistantscenter.com/img/logo.png',
                        lightUrl: 'https://assistanscenter.com/img/logo.png',
                        hideName: true,
                        borderRadius: false,
                        alignCenter: true
                    },
                },
                index: {
                    graph: {
                        enabled: true,
                        lineGraph: false,
                        title: 'Memory Usage',
                        tag: 'Memory (MB)',
                        max: 100
                    },
                },
                sweetalert: {
                    errors: {},
                    success: {
                        login: "Successfully logged in.",
                    }
                },
                preloader: {
                    image: "/img/soft-ui.webp",
                    spinner: false,
                    text: "Page is loading",
                },
                admin: {
                    pterodactyl: {
                        enabled: false,
                        apiKey: "apiKey",
                        panelLink: "https://panel.website.com",
                        serverUUIDs: []
                    }
                },
                commands: [],
            }),
            settings: [
                {
                    categoryId: "welcome",
                    categoryName: "Welcome system",
                    categoryDescription: "Setup the weclome system",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1062107362879619123/1062107518983221328/zeenbot.png',
                    categoryOptionsList: [
                        {
                            optionId: "welcomechannel",
                            optionName: "Welcome Channel",
                            optionDescription: "Set the channel for the welcome system",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeSchema.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {
                                let data = await WelcomeSchema.findOne({ Guild: guild.id }).catch(err => { })
                                if (!newData) newData = null
                                if (!data) {
                                    data = new WelcomeSchema({
                                        Guild: guild.id,
                                        Channel: newData,
                                    })
                                    await data.save()
                                } else {
                                    data.Channel = newData
                                    await data.save()
                                }
                                return
                            }
                        }
                    ]
                },
            ]
        });
        Dashboard.init();
    }
}