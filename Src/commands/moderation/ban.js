const { PermissionFlagsBits } = require("discord.js")

module.exports = {
    name : 'ban', 
    description : 'bans a random guy', 

    PermissionRequired : [PermissionFlagsBits.Administrator],
    BotPermission : [PermissionFlagsBits.Administrator],

    callback : (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }

}