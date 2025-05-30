const { Client, IntentsBitField} = require('discord.js')
const EventHandler = require('./handlers/EventHandler.js')
require('dotenv').config()
const mongoose = require('mongoose')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ]
})

async function run() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.DB)

        EventHandler(client)

        client.login(process.env.TOKEN)

        console.log("CB se conectou a data bse")
    } catch(error) {
        console.log(error)
    }
}
run()