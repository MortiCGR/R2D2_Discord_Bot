import { Client, MessageEmbed } from "discord.js"
import CostCalculator from "./CostCalculator/CostCalculator"
import HeroCostCalculator from "./CostCalculator/HeroCostCalculator"
import paceCalculator from "./PaceCalculator/paceCalculator"
import resetCalculator from "./ResetCalculator/resetCalculator"

export default (client : Client) => {
    client.on('messageCreate', (message) => {
        // make sure it's a command OR it's not send from welcome channel
        if ((!message.content.startsWith('!') && !message.content.startsWith('^')) || message.channelId === '720272056259838052') {
            return
        }

        const messageStringList = message.content.split(' ');

        const commandName = messageStringList[0].substring(1).toLowerCase();

        let content

        switch (commandName) {
            case 'help':
                const embed = new MessageEmbed() 
                .setTitle("Help Command")
                .setColor(0x00AE86)
                .setDescription("Type ^help for this command")
                .addField("^reset",
                "will bring up reset timers for Guild Season, Season Colonies and Hell Mode.")
                .addField("^pace", "followed by any number will bring up an estimate for your waves for the rest of that guild season, based on the number that you put in and hours elapsed in the season so far.", true)
                .addField("^ratio", "followed by your wave and the ratio you want to have, such as 200000 and 0.4 will pull up the TA/Castle value you should have for that wave/ratio.")
                .addField("^hero", `followed by a starting and ending level will give you the gold difference for levelling from start to end. "^hero 10 1000" for example`)
                .addField("^castle",`followed by a starting and ending level will give you the gold difference for levelling from start to end. "^Castle 10000 100001" for example`)
                .addField("^ta", `followed by a starting and ending level will give you the gold difference for levelling from start to end. "^TA 10000 100001" for example`);
    
                message.channel.send({ embeds: [embed]});
                
                break;
            case 'pace':
                content = messageStringList.length == 2 ? paceCalculator(messageStringList[1]) : 'Needs one parameter for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
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