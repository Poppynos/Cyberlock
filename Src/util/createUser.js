const wordleSchema = require('../models/wordleModel')

module.exports = (msgId, guess) => {
    const newUser = new wordleSchema({
        userId : msgId,
        lastPlayed : 'first timer',
        guesses : [guess],
        wins : 0,
        gamesPlayed : 0
    })

    return newUser
}