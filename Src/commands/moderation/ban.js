module.exports = {
    name : 'ban', 
    description : 'bans a random guy', 

    callback : (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }

}