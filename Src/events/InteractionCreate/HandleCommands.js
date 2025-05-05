const { devs, TestServer} = require('../../../config.json')
const GetLocalCommands = require('../../util/GetLocalCommands')

module.exports = async (client, interaction) => {
  console.log('FUNCIONA')
    if(!interaction.isChatInputCommand()) return

    const LocalCommands = GetLocalCommands()

    try {
        const CommandObj = LocalCommands.find((cmd) => cmd.name === interaction.commandName)
        if(!CommandObj) return

        if(CommandObj.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content : 'Nuh uh babe, Only devs',
                    ephemeral : true    
                })
            }
            return
        }

        if(CommandObj.TestOnly){
            if(!(interaction.guild.id === TestServer)){
                interaction.reply({
                    content : 'Nuh uh babe, Only on the test server',
                    ephemeral : true    
                })
            }
            return
        }

        if(CommandObj.PermissionRequired?.length){
            for (const permission of CommandObj.PermissionRequired) {
                if (!interaction.member.permissions.has(permission)) {
                  interaction.reply({
                    content: 'Nuh uh, you are not allowed',
                    ephemeral: true,
                  });
                  return;
                }
            }
        }

        if (CommandObj.botPermission?.length) {
            for (const permission of CommandObj.BotPermission) {
              const bot = interaction.guild.members.me;
              if (!bot.permissions.has(permission)) {
                interaction.reply({
                  content: "Nuh uh, i dont have permissions",
                  ephemeral: true,
                });
                return;
              }
            }
          }
        await CommandObj.callback(client, interaction)
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
}