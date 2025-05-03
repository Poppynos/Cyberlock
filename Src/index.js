const { Client, IntentsBitField} = require('discord.js')
const EventHandler = require('./handlers/EventHandler.js')
require('dotenv').config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ]
})

EventHandler(client)

client.login(process.env.TOKEN)