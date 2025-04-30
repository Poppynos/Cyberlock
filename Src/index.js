//little baby man lowkey lol
const { Client, IntentsBitField} = require('discord.js')
require('dotenv').config()

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent
    ]
})

client.login(process.env.TOKEN)

 client.on('ready', (c) => {
    console.log(`BIG BAD ${c.user.username} is online`)
 })

client.on('messageCreate', (message) => {
    if(!message.author.bot && message.content === 'LEVANTE'){
        message.reply('Hellor wordddd!!!!!!!!💅')
    }
})