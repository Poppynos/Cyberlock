const canva = require('canvas')
const { AttachmentBuilder } = require('discord.js');
const { ApplicationCommandOptionType } = require("discord.js")
const wordleSchema = require('../../models/wordleModel')
const getTodaysDate = require('../../util/getTodaysDate')
const createUser = require('../../util/createUser')
const words = require('../../../words.json')

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
        const guess = String(interaction.options.get('guess').value).toUpperCase()

        if(guess.length !== 5){
            interaction.reply('Insira uma resposta valida')
            return
        }

        try {
            const userData = await wordleSchema.findOne({ userId : interaction.user.id })
            let user = userData

            let winRate = user?.wins/user?.gamesPlayed * 100

            if(user?.lastPlayed == getTodaysDate()){
                    interaction.reply(`Você já jogou hoje, volte amanhã! Sua palavra era: ${user.answer}. Sua porcentagem de vitória é de ${winRate.toFixed(0)}%`)
                    return
            }

            if(user){
                if(getTodaysDate() !== user.lastMessage){
                    user.lastMessage = getTodaysDate()
                    user.answer = ''
                    user.guesses = []
                }
                user.guesses.push(guess)   
            }else if(!user){
                user = createUser(interaction.user.id, guess)
            }


            if(user.answer == ''){
                user.answer = words.wordsList[Math.floor(Math.random() * words.wordsList.length)]
            }

            await user.save()

            const canvas = canva.createCanvas(330, 397)
            const context = canvas.getContext('2d')

            const background = await canva.loadImage('Src/commands/games/images/BlackSquare.png')
            context.drawImage(background , 0 , 0 , canvas.width , canvas.height)

            context.font = '42px Clear Sans, Helvetica Neue, Arial, sans-serif'
            context.textAlign = 'center'
            context.fillStyle = '#d7dadc'

            const image = [
                await canva.loadImage('Src/commands/games/images/EmptySquare.png'),
                await canva.loadImage('Src/commands/games/images/GreenSquare.png'),
                await canva.loadImage('Src/commands/games/images/YellowSquare.png'),
                await canva.loadImage('Src/commands/games/images/ColorAbsent.png'),
            ]

            let square = ''
            
            let squareSize = 62
            let rowOffset = 0
            let buffer = 0

            for(let i = 0 ; i <= 5 ; i++){
                for(let letter = 0 ; letter <= 4 ; letter++){
                    if(user.guesses[i] === undefined){
                        square = image[0]
                    }
                    else if(user.guesses[i].charAt(letter) === user.answer.charAt(letter)){
                        square = image[1]
                    }
                    else if(user.answer.includes(user.guesses[i].charAt(letter))){
                        square = image[2]
                    }
                    else{
                        square = image[3]
                    }

                    context.drawImage(square, letter*squareSize+buffer, rowOffset, squareSize, squareSize);
                    if(user.guesses[i] !== undefined){
                        context.fillText(user.guesses[i].charAt(letter), (squareSize/2)+buffer+squareSize*letter, rowOffset+42);
                    }
                    buffer+= 5
                }
                buffer = 0
                rowOffset+=squareSize+5;
            }

                if(user.guesses.includes(user.answer)){
                    user.wins += 1
                    user.gamesPlayed += 1
                    user.lastPlayed = getTodaysDate()

                    await user.save()
                }else if(user.guesses.length - 1 == 5){ 
                    user.gamesPlayed += 1
                    user.lastPlayed = getTodaysDate()

                    await user.save()
                }

            const attachment = new AttachmentBuilder(canvas.toBuffer(), 'wordle.png');
            
            interaction.reply({ files : [attachment] });
        } catch (error) {
            console.log(error)
        }
    }
}