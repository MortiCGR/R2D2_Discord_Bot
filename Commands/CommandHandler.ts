import { Client, MessageEmbed } from "discord.js"
import CostCalculator from "./CostCalculator/CostCalculator"
import HeroCostCalculator from "./CostCalculator/HeroCostCalculator"
import paceCalculator from "./PaceCalculator/paceCalculator"
import resetCalculator from "./ResetCalculator/resetCalculator"

export default (client : Client) => {
    client.on('messageCreate', (message) => {
        // to safely test commands in test server
        // if (message.guildId != "963913950041370676")
        // {
        //     return
        // }
        
        // make sure it's a command OR it's not send from welcome channel
        if ((!message.content.startsWith('!') && !message.content.startsWith('^')) || message.channelId === '720272056259838052') {
            return
        }

        const username = message.author.username;
        const messageStringList = message.content.split(' ');
        const commandName = messageStringList[0].substring(1).toLowerCase();

        let content

        switch (commandName) {
            case 'help':
                let embed = new MessageEmbed() 
                .setTitle("Help Command")
                .setColor(0x00AE86)
                .setDescription("Type ^ or ! as a prefix for a command")
                .addField("^reset",
                "returns reset timers for Guild Season, Season Colonies and Hell Mode.")
                .addField("^pace [seasonal waves] [OPTIONAL target pace]", "returns an estimate for your waves for the rest of that guild season, based on the number that you put in and hours elapsed in the season so far. Optionally it returns how many waves you should have done to reach your target pace")
                .addField("^ratio [career wave] [ratio]", "returns the level of the unit you should have based on your wave and your desired ratio.")
                .addField("^hero [initial level] [final level]", `returns the gold difference for levelling from start to end. "^hero 10 1000" for example`)
                .addField("^castle [initial level] [final level]",`returns the gold difference for levelling from start to end. "^Castle 10000 100001" for example`)
                .addField("^ta [initial level] [final level]", `returns the gold difference for levelling from start to end. "^TA 10000 100001" for example`);
    
                message.channel.send({ embeds: [embed]});
                
                break;
            case 'pace':
                message.channel.send({ embeds: [paceCalculator(username, messageStringList)]});
                
                break;
            case 'ratio':
                content = messageStringList.length == 3 ? (parseInt(messageStringList[1])*parseFloat(messageStringList[2])).toString() : 'Needs two parameter for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            case 'reset':
                message.reply({
                    content: resetCalculator(),
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            case 'hero':
                content = messageStringList.length == 3 ? HeroCostCalculator(messageStringList[1], messageStringList[2]) : 'Needs two parameters for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            case 'castle':
                content = messageStringList.length == 3 ? CostCalculator(messageStringList[1], messageStringList[2], 2500) : 'Needs two parameters for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            case 'ta':
                content = messageStringList.length == 3 ? CostCalculator(messageStringList[1], messageStringList[2], 1000) : 'Needs two parameters for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            default:
                message.reply({
                    content: `"${commandName}" is not a valid command, try ^help to find the list of all the valid commands`,
                    allowedMentions: { repliedUser: false }
                })
                break;
        }
    })
}