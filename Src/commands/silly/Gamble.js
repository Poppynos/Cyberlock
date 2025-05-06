module.exports = {
    name : 'gamble', 
    description : 'Tells you if you should gamble', 

    callback : (client, interaction) => {
        let randomNum = Math.floor(Math.random() * 100) + 1

        interaction.reply(
            (randomNum > 99) ? 'YES! YES! YIPPEEE :3' : 'No, gambling is dangerous and irresponsible'
        )
    }
}