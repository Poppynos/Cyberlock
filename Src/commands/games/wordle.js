module.exports = {
    name : 'wordle', 
    description : 'starts a wordle game!', 

    callback : (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }
}