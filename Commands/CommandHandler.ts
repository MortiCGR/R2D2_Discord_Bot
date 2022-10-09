import { Client, MessageEmbed } from "discord.js"
import CostCalculator from "./CostCalculator/CostCalculator"
import HeroCostCalculator from "./CostCalculator/HeroCostCalculator"
import paceCalculator from "./PaceCalculator/paceCalculator"
import resetCalculator from "./ResetCalculator/resetCalculator"
import UpgradesCalculator from "./UpgradesCalculator/UpgradesCalculator"

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

        const username = message.member?.displayName;
        const messageStringList = message.content.split(' ');
        const commandName = messageStringList[0].substring(1).toLowerCase();

        let content

        switch (commandName) {
            case 'help':
                let embed = new MessageEmbed() 
                .setTitle("Help Command")
                .setColor(0x00AE86)
                .setDescription("Type ^ or ! as a prefix for a command")
                .addFields(
                    { name: "^reset", value: "returns reset timers for Guild Season, Season Colonies and Hell Mode."},
                    { name: "^pace [seasonal waves] [OPTIONAL target pace]", value: "returns an estimate for your waves for the rest of that guild season, based on the number that you put in and hours elapsed in the season so far. Optionally it returns how many waves you should have done to reach your target pace" },
                    { name: "^ratio [career wave] [ratio]", value: "returns the level of the unit you should have based on your wave and your desired ratio." },
                    { name: "^hero [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^hero 1 10000" },
                    { name: "^castle [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^castle 50000 60000" },
                    { name: "^ta [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^TA 10000 20000" },
                    { name: "^upgrade [ta/castle/hero][initial level] [gold, e.g. 12.345B]", value: "returns the level you will upgrade your unit based on the initial level and the amount of gold. Valid units for gold B/T/Q. This command doesn't work when the initial level of a hero is below level 10k\nE.g. !upgrade TA 10000 200.5B" }
                )
    
                message.channel.send({ embeds: [embed]});
                
                break;
            case 'pace':
                message.channel.send({ embeds: [paceCalculator(username, messageStringList)]});
                
                break;
            case 'ratio':
                content = messageStringList.length == 3 ? (Math.floor(parseFloat(messageStringList[1])*parseFloat(messageStringList[2]))).toString() : 'Needs two parameter for this command'
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                })
                
                break;
            case 'reset':
                message.channel.send({ embeds: [resetCalculator()]});
                
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
            case 'upgrade':
                message.channel.send({ embeds: [UpgradesCalculator(username, messageStringList)]});
                
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