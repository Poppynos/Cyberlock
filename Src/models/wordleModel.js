const { Schema , model } = require('mongoose')

const wordleSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    lastPlayed : {
        type : String,
        required : true
    },
    guesses : {
        type : Array,
        default : []
    }, 
    wins : {
        type : Number,
        default : 0
    },
    gamesPlayed : {
        type : Number,
        default : 0
    }
})

module.exports = model('Wordle', wordleSchema)