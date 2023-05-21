import { MessageEmbed } from "discord.js";

export default(username : string|undefined, parameters: string[]) => {
    
    const embed = new MessageEmbed()
    .setTitle("TAB gold estimate per hour")
    .setColor(0xCC0000) // red for errors

    if (parameters.length != 3)
    {
        embed.setDescription(`${username}, the correct format of this command is:\n ${parameters[0]} [avg wave time in seconds] [gpw]\n E.g. ${parameters[0]} 32.5 550`)
        return embed
    }
    
    let waveTime = parameters[1];
    let waveTimeNumber = parseFloat(waveTime);
    if (!waveTimeNumber)
    {
        embed.setDescription(`${username}, the first parameter, ${waveTime}, is not a valid number`)
        return embed
    }

    let gpw = parameters[2];
    let gpwNumber = parseFloat(gpw)
    if (!gpwNumber)
    {
        embed.setDescription(`${username}, the second parameter, ${gpw}, is not a valid number`)
        return embed
    }

    let embedDescription = `${username}, with an average wave time of ${waveTime}s and gold per wave ${gpw} your gold per hour should be: \n\n ${(Math.floor(60 * 60 / waveTimeNumber * gpwNumber)).toString()}`;
    embed.setColor(0x00AE86) // green for success
    .setDescription(embedDescription)
    return embed
}
