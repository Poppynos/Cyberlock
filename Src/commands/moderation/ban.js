module.exports = {
    name : 'ban', 
    description : 'Bans a random guy', 

    callback : (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }
}