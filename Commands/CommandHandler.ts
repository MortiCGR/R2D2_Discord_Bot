import { Client } from "discord.js"
import paceCalculator from "./PaceCalculator/paceCalculator"
import resetCalculator from "./ResetCalculator/resetCalculator"

export default (client : Client) => {
    client.on('messageCreate', (message) => {
        // make sure it's a command OR it's not send from welcome channel
        if (!message.content.startsWith('!') || message.channelId === '720272056259838052') {
            return
        }

        const messageStringList = message.content.split(' ');

        const commandName = messageStringList[0].substring(1);

        let content

        switch (commandName) {
            case 'pace':
                content = messageStringList.length == 2 ? paceCalculator(messageStringList[1]) : 'Needs only one parameter for this command'
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
        
            default:
                break;
        }
    })
}