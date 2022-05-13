import { Client } from "discord.js"

export default (client : Client) => {
    const channelId = `963913950620176386`; // test welcome channel
    // const channelId = `963913950620176386`; // RB welcome channel

    client.on('guildMemberAdd', (member) => {
        const message = `Hi! <@${member.id}> Welcome to RedBridge! Just a quick summary of our guilds :\n\n 
 
        :RB1: Redbridge - 30k waves per season - 50k minimum career waves\n 
        :RB2: Redbridge 2 - 20k waves per season - 10k minimum career waves\n 
        :RB3: Redbridge 3 - 8k waves per season - 5k minimum career waves\n 
        :EXT: EXT - 8k waves per season - 5k minimum career waves\n 
        :rb6: Redbridge 6 - 1K waves per season - No minimum career wave to join\n 
        :rb7: Redbridge 7 - 1K waves per season - No minimum career wave to join\n 
        :EXT: EXT2 - 1 wave per season - No minimum career wave to join\n\n 
         
        - We also have a guest channel if you're just stopping by to say hi\n\n 
         
         If you want to join can you please provide us with :\n 
        In-Game Name :\n
        Waves : \n
        Estimated Waves/Season (5 day period) :\n 
        Thank you!`

        const channel = member.guild.channels.cache.get(channelId)
        
        if (channel !== undefined && channel.isText())
        {
            channel.send(message)
        }
    })
}