const discord = require('discord.js');
const firebase = require('firebase');
const env = require('dotenv').config();
const prefix = '>>';
const mods = ['Developer', 'an alien', '❄Roger e.e❄']

firebase.initializeApp({
    apiKey: "AIzaSyACX60OfX5FE3T6Kr1kBw_lZqqILu8DYmM",
    authDomain: "pinkteamb.firebaseapp.com",
    databaseURL: "https://pinkteamb.firebaseio.com",
    projectId: "pinkteamb",
    storageBucket: "pinkteamb.appspot.com",
    messagingSenderId: "542368478810",
    appId: "1:542368478810:web:987f2ae3e30515c64fca63"
})

var firestore = firebase.firestore();

var doc = firestore.collection('homeworkbotConfig').doc('BWC1c8XNAQQPLmt8mlRu');

var bot = new discord.Client();
const logo = 'https://cdn.discordapp.com/app-icons/680520732614459419/8c76b1f456a1f5d5185175f90ca3480b.png';

doc.onSnapshot(function(doc) {
    bot.user.setPresence({
        game: {
            name: doc.data().name,
            type: doc.data().type,
        }
    })
})

bot.on('message', message => {
    const args = message.content.substring(prefix.length).split(' ');

    switch (args[0]) {
        case 'ban':
            const user = message.mentions.users.first();
            const userGuild = message.guild.members.get(user.id);
            //const reson = message.content.substring(userGuild).split(' ');
            if (message.author.username === mods[0] || message.author.username === mods[1] || message.author.username === mods[2]) {
                if (userGuild.bannable == true) {
                    userGuild.ban().then(() => {
                        const banEmbed = new discord.RichEmbed({
                            title: `✅ ${user.username} Got The Boot ✅`,
                            hexColor: '#E8532E',
                            author: {
                                name: '🔰 Homework Bot 🔰',
                                icon_url: logo,
                            },
                            description: `💥 ${message.author.username} kicked the boot on ${user.username} 💥`,
                            footer: {
                                text: ` Date Sent ${new Date} `,
                                icon_url: logo
                            }
                        })
                        message.channel.send(banEmbed);
                    }).catch(err => {
                        const banEmbed1 = new discord.RichEmbed({
                            title: `🚧 Error 🚧`,
                            hexColor: '#E8532E',
                            author: {
                                name: '🔰 Homework Bot 🔰',
                                icon_url: logo,
                            },
                            description: `🚧 The User ${user.username} ${err} 🚧`,
                            footer: {
                                text: ` Date Sent ${new Date} `,
                                icon_url: logo
                            }
                        })
                        message.channel.send(banEmbed1);
                    })
                } else {
                    const banEmbed2 = new discord.RichEmbed({
                        title: `❌ Error ❌`,
                        hexColor: '#E8532E',
                        author: {
                            name: '🔰 Homework Bot 🔰',
                            icon_url: logo,
                        },
                        description: `❌ The User ${user.username} is not bannable ❌`,
                        footer: {
                            text: ` Date Sent ${new Date} `,
                            icon_url: logo
                        }
                    })
                    message.channel.send(banEmbed2);
                }
            }
            break;

        case 'banTest':
            const banEmbedt = new discord.RichEmbed({
                title: `✅ testUser Got The Boot ✅`,
                hexColor: '#E8532E',
                author: {
                    name: '🔰 Homework Bot 🔰',
                    icon_url: logo,
                },
                description: `💥 testUser kicked the boot on testUser 💥`,
                footer: {
                    text: `Date Sent ${new Date}`,
                    icon_url: logo
                }
            })
            message.channel.send(banEmbedt);

            const banEmbedte = new discord.RichEmbed({
                title: `🚧 Error 🚧`,
                hexColor: '#E8532E',
                author: {
                    name: '🔰 Homework Bot 🔰',
                    icon_url: logo,
                },
                description: `🚧 The User testUser errr 🚧`,
                footer: {
                    text: `Date Sent ${new Date}`,
                    icon_url: logo
                }
            })
            message.channel.send(banEmbedte);
            break;

        case 'slow':
            break;
    }
});

bot.on('guildMemberAdd', join => {
    try {
        const channel = join.guild.channels.find(channel => channel.name === "classes-list");
        //const channel2 = join.guild.channels.find(channel2 => channel2.name === 'welcome');
        const welcomeEmbed = new discord.RichEmbed({
            title: `Welcome ${join.user.username} To the Homework Discord`,
            color: 3447003,
            author: {
                name: 'Homework Bot',
                icon_url: logo,
            },
            description: 'Put all of your homework answers in the #homework-answers channel and put all of your classes in #classes-list ' +
                'and for chating use the #general channel',
            footer: {
                text: `Date Sent ${new Date}`,
                icon_url: logo
            }
        })
        channel.send(welcomeEmbed);
    } catch (err) {
        console.log(err);
    }
});

bot.login(process.env.TK);

bot.on('ready', () => {
    console.log('ready');
})