const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")

module.exports = {
    name : 'dice', 
    description : 'Rolls any amount and type of dice', 
    options : [{
        name : 'amount-of-dice',
        description : 'The amount of dice to be rolled',
        required : true,
        type : ApplicationCommandOptionType.Number
    },
    {
        name : 'type-of-dice',
        description : 'The type of dice that will be rolled',
        required : true,
        type : ApplicationCommandOptionType.Number,
        choices : [
            {
                name : 'd4',
                value : 4
            },
            {
                name : 'd6',
                value : 6
            },
            {
                name : 'd8',
                value : 8
            },
            {
                name : 'd10',
                value : 10
            },
            {
                name : 'd12',
                value : 12
            },
            {
                name : 'd20',
                value : 20
            },
            {
                name : 'd100',
                value : 100
            },
        ]
    },

],
    callback : (client, interaction) => {
        const amountOfDice = interaction.options.get('amount-of-dice').value
        const typeOfDice = interaction.options.get('type-of-dice').value
        let diceRolled = []

        if(amountOfDice > 100){
            interaction.reply('[ERROR] Too many dice, the maximum amount is a 100.')
            return
        }

        for(let i = 0 ; i < amountOfDice ; i++){
            let diceResult = Math.floor(Math.random() * typeOfDice) + 1
            diceRolled.push(diceResult)
        }
        const sortedDice = diceRolled.sort((a, b) => a - b)

        interaction.reply(`(${amountOfDice}d${typeOfDice}) Results: ${diceRolled.join(' ')} | Biggest: ${sortedDice[sortedDice.length - 1]}. Smallest: ${sortedDice[0]}`)
    }
}
