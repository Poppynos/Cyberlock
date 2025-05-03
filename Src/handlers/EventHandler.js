const path = require('path')
const GetAllFiles = require('../util/GetAllFiles')
const { eventNames } = require('process')

module.exports = (client) => {
    const EventFolders = GetAllFiles(path.join(__dirname, '..', 'events'), true)

    for(const EventFolder of EventFolders){
        const EventFiles = GetAllFiles(EventFolder)
        EventFiles.sort((a, b) => a > b)

        const EventName = EventFolder.replace(/\\/g, '/').split('/').pop()

        client.on(EventName, async (arg) => {
            for(const EventFile of EventFiles){
                const EventFunction = require(EventFile)
                
                if (typeof EventFunction === 'function') {
                  await EventFunction(client, arg)
                }               
            }
        })
    }
}