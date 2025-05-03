const path = require('path')
const GetAllFiles = require('./GetAllFiles')

module.exports = (exceptions) => {
    let LocalCommands = []

    const Categories = GetAllFiles(path.join(__dirname, '..', 'commands'), true)

    for(const Categorie of Categories){
        const CommandFiles = GetAllFiles(Categorie)

        for(const CommandFile of CommandFiles){
            const CommandObj = require(CommandFile)
            LocalCommands.push(CommandObj)
        }
    }
    
    return LocalCommands
}