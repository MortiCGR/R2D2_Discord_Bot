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
        
        let message = `Hi! <@${member.id}> Welcome to RedBridge! Just a quick summary of our guilds :\n\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'RB1')} RedBridge - 50k waves per season - 50k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'RB2')} RedBridge 2 - 30k waves per season - 10k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'GlanceReviver')} GlanceReviver - 10k waves per season - 5k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'RB3')} RedBridge 3 - 8k waves per season - 5k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'EXT')} -EXT- - 8k waves per season - 5k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'SK_SanMarino')} SK_San Marino - 5k waves per season - 5k minimum career waves\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'rb6')} RedBridge 6 - 3K waves per season - No minimum career wave to join\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'rb7')} RedBridge 7 - 1.5K waves per season - No minimum career wave to join\n`
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'EXT')} -EXT2- - 1 wave per season - No minimum career wave to join\n\n`
        message += `- We also have a guest channel if you're just stopping by to say hi\n\n`
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