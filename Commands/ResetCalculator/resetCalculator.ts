import { MessageEmbed } from "discord.js";
import ConvertMsToTime from "../Utils/ConvertMsToTime";

export default () => {
    
    // offset date in UTC
    let dt = new Date("2022-04-10T15:00:00Z");
    let dOffset = dt.getTime();
    let d = new Date(); 
    // pass current date to UTC
    let dNowUTC =  Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    
    // now - ( offset date + time from offset date until the start of the current season in milliseconds)
    let wavesResult = (1000 * 60 * 60 * 24 * 5) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 5*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/5)));
    let coloniesResult = (1000 * 60 * 60 * 24 * 10) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 10*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/10)));
    let hellResult = (1000 * 60 * 60 * 24 * 7) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 7*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/7)));

    let result = `Guild reset in ${ConvertMsToTime(wavesResult)}\n`
    result += `Individual reset in ${ConvertMsToTime(wavesResult - 1000 * 60 * 5)}\n`
    result += `Hell Mode reset in ${ConvertMsToTime(hellResult - 1000 * 60 * 20)}\n`
    result += `Colonies reset in ${ConvertMsToTime(coloniesResult - 1000 * 60 * 10)}\n`

    const embed = new MessageEmbed()
    .setTitle("Reset")
    .setDescription(result)
    return embed
}
