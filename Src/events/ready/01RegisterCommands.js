const { TestServer } = require('../../../config.json') 
const GetLocalCommands = require('../../util/GetLocalCommands')
const AreCommandsDiff = require('../../util/AreCommandsDif')
const GetAppCommands = require('../../util/GetAppCommands')


module.exports = async (client) => {
    try {
        //ALL HAIL THE OMNISAIAH 
        const LocalCommands = GetLocalCommands()
        const AppCommands = await GetAppCommands(client, TestServer)
        
        for(const LocalCommand of LocalCommands){

            const { name, description, options } = LocalCommand
            const ExistingCommand = await AppCommands.cache.find((cmd) => cmd.name === name)

            if(ExistingCommand){
                if(LocalCommand.deleted){
                    await AppCommands.delete(ExistingCommand.id,)
                    console.log(`${name} was deleted`)
                    continue
                }

                if(AreCommandsDiff(ExistingCommand, LocalCommand)){
                    await AppCommands.edit(ExistingCommand.id, { description, options })

                    console.log(`${name} was edited`)
                }
            }else if(LocalCommand.deleted){            
                console.log(`dont really get what going on here tbh ${name}`)
                continue
            }
            await AppCommands.create({
                name,
                description,
                options,
            })
            console.log(`${name} was registred`)
        }
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
}