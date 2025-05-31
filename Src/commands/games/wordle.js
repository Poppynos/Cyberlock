const canva = require('canvas')
const { AttachmentBuilder } = require('discord.js');
const { ApplicationCommandOptionType } = require("discord.js")
const wordleSchema = require('../../models/wordleModel')
const getTodaysDate = require('../../util/getTodaysDate')
const createUser = require('../../util/createUser')

module.exports = {
    name : 'wordle', 
    description : 'starts a game of wordle', 
    options : [{
        name : 'guess',
        description : 'type the word you want to guess',
        required : true,
        type : ApplicationCommandOptionType.String
    }],

    callback : async (client, interaction) => {
        try {
            const userData = await wordleSchema.findOne({ userId : interaction.user.id })
            let user = userData

            if(userData){
                userData.guesses.push(interaction.options.get('guess'))
            }else{
                user = createUser(interaction.userId, interaction.options.get('guess'))
            }

            console.log(user )
        } catch (error) {
            console.log(error)
        }

    }
}