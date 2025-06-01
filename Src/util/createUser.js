const wordleSchema = require('../models/wordleModel')
const getTodaysDate = require('../util/getTodaysDate')

module.exports = (msgId, guess) => {
    const newUser = new wordleSchema({
        userId : msgId,
        lastPlayed : 'first time',
        lastMessage : getTodaysDate(),
        answer : '',
        guesses : [guess],
        wins : 0,
        gamesPlayed : 0
    })

    return newUser
}