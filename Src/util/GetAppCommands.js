module.exports = async (client, GuildId) => {
    let AppComands
    
    if(GuildId){
        const Guild = client.guilds.fetch(GuildId)
        AppComands = Guild.commands
    }else{
    AppComands = client.application.commands
    }
    
    await AppComands.fetch()
    return AppComands
}