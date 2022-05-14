"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client) => {
    const channelId = `963913950620176386`; // test welcome channel
    // const channelId = `963913950620176386`; // RB welcome channel
    client.on('guildMemberAdd', (member) => {
        let message = `Hi! <@${member.id}> Welcome to RedBridge! Just a quick summary of our guilds :\n\n`;
        message += `${member.guild.emojis.cache.find(emoji => emoji.name === 'RB1')} Redbridge - 30k waves per season - 50k minimum career waves\n`;
        message += `:RB2: Redbridge 2 - 20k waves per season - 10k minimum career waves\n`;
        message += `:RB3: Redbridge 3 - 8k waves per season - 5k minimum career waves\n`;
        message += `:EXT: EXT - 8k waves per season - 5k minimum career waves\n`;
        message += `:rb6: Redbridge 6 - 1K waves per season - No minimum career wave to join\n`;
        message += `:rb7: Redbridge 7 - 1K waves per season - No minimum career wave to join\n`;
        message += `:EXT: EXT2 - 1 wave per season - No minimum career wave to join\n\n`;
        message += `- We also have a guest channel if you're just stopping by to say hi\n\n`;
        message += `If you want to join can you please provide us with :\n`;
        message += `In-Game Name :\n`;
        message += `Waves :\n`;
        message += `Estimated Waves/Season (5 day period) :\n`;
        message += `Thank you!\n`;
        const channel = member.guild.channels.cache.get(channelId);
        if (channel !== undefined && channel.isText()) {
            channel.send(message);
        }
    });
};
