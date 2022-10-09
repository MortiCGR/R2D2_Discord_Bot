import { MessageEmbed } from "discord.js";
import ConvertMsToTime from "../Utils/ConvertMsToTime";

export default (username : string|undefined, parameters: string[]) => {
    const embed = new MessageEmbed()
    .setTitle("Pace")
    .setColor(0xCC0000) // red for errors

    if (parameters.length == 1 || parameters.length > 3)
    {
        embed.setDescription(`${username}, the correct format of this command is:\n ${parameters[0].charAt(0)}pace [number seasonal waves] [OPTIONAL number target pace]`)
        return embed
    }
    
    let waves = parameters[1];
    
    let wavesNumber = parseInt(waves)
    let targetPace

    
    let embedDescription = `${username}`;
    
    if (!wavesNumber) {
        embedDescription += `\n\n`
        embedDescription += `Seasonal waves ${waves} is not a valid number`
    }
    else {
        embedDescription += ` seasonal waves: ${waves}.`
    }

    if (parameters.length == 3)
    {
        targetPace = parseInt(parameters[2])
        if (!targetPace)
        {
            embedDescription += `\n\n`
            embedDescription += `Target pace ${parameters[2]} is not a valid number`
        }
        else {
            embedDescription += ` Wanted pace: ${targetPace}.`
        }
    }
    
    embed.setColor(0x00AE86) // green for success
    .setDescription(embedDescription)

    // offset date in UTC
    let dt = new Date("2022-09-18T14:55:00Z");
    let dOffset = dt.getTime();
    let d = new Date(); 
    // pass current date to UTC
    let dNowUTC =  Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    
    // now - ( offset date + time from offset date until the start of the current season in milliseconds)
    let result = (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 5*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/5)))/(1000 * 60 * 60 * 24);

    let pace = Math.floor(wavesNumber / (result*24) * 120);

    let timeRemaining = (1000 * 60 * 60 * 24 * 5) - (result * (1000 * 60 * 60 * 24))

    
    embed
    .addField("Estimated pace", `${pace}`, true)
    .addField("Average WPH", `${Math.floor(pace/120)}`, true)
    .addField("Time remaining", `${ConvertMsToTime(timeRemaining)}`)

    if (targetPace)
    {
        let expectedWave = Math.floor((result*24) *(targetPace / 120))
        embed.addField("Your wave should be", `${expectedWave}`, true)
        embed.addField("Average WPH", `${Math.floor(targetPace/120)}`, true)
    }

    return embed
}