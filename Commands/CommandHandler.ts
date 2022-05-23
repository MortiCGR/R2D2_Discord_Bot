import { Client } from "discord.js"
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
            case 'pace':
                content = messageStringList.length == 2 ? paceCalculator(messageStringList[1]) : 'Needs one parameter for this command'
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
                break;
        }
    })
}