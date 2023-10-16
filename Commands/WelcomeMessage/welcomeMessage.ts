import { Client } from "discord.js"

export default (client : Client) => {
    const testChannelId = `963913950620176386`; // test welcome channel
    const serverChannelId = `720272056259838052`; // RB welcome channel

    client.on('guildMemberAdd', (member) => {
        // to safely test commands in test server
        // if (member.guild.id != "963913950041370676")
        // {
        //     return
        // }
        
        let message = `Hi! <@${member.id}> Welcome to RedBridge! ${member.guild.emojis.cache.find(emoji => emoji.name === 'RB_COMP_GUILD')} :\n\n`
        message += `For a list of our guilds and their seasonal wave requirements, please check the :pushpin: **pinned message** :pushpin:\n\n`
        message += `We also have a guest channel if you're just stopping by to say hi (please still provide your in-game name and waves)\n\n`
        message += `If you want to join can you please provide us with :\n`
        message += `In-Game Name :\n`
        message += `Waves :\n`
        message += `Estimated Waves/Season (5 day period) :\n`
        message += `Thank you!\n`

        let channelId = member.guild.id == "963913950041370676" ? testChannelId : serverChannelId

        const channel = member.guild.channels.cache.get(channelId)
        
        if (channel !== undefined && channel.isText())
        {
            channel.send(message)
        }
    })
}