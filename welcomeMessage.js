"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client) => {
    const channelId = `963913950620176386`; // test welcome channel
    // const channelId = `963913950620176386`; // RB welcome channel
    client.on('guildMemberAdd', (member) => {
        const message = `Hi! <@${member.id}> Welcome to RedBridge! Just a quick summary of our guilds :
 
        <:RB1:974826460084863047> Redbridge - 30k waves per season - 50k minimum career waves
        :RB2: Redbridge 2 - 20k waves per season - 10k minimum career waves
        :RB3: Redbridge 3 - 8k waves per season - 5k minimum career waves 
        :EXT: EXT - 8k waves per season - 5k minimum career waves 
        :rb6: Redbridge 6 - 1K waves per season - No minimum career wave to join
        :rb7: Redbridge 7 - 1K waves per season - No minimum career wave to join
        :EXT: EXT2 - 1 wave per season - No minimum career wave to join
         
        - We also have a guest channel if you're just stopping by to say hi
         
         If you want to join can you please provide us with : 
        In-Game Name :
        Waves : 
        Estimated Waves/Season (5 day period) :
        Thank you!`;
        const channel = member.guild.channels.cache.get(channelId);
        if (channel !== undefined && channel.isText()) {
            channel.send(message);
        }
    });
};
