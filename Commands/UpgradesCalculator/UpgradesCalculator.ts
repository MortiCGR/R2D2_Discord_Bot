import { MessageEmbed } from "discord.js";

export default(username : string|undefined, parameters: string[]) => {
    const embed = new MessageEmbed()
    .setTitle("Upgrade")
    .setColor(0xCC0000) // red for errors

    if (parameters.length != 4)
    {
        embed.setDescription(`${username}, the correct format of this command is:\n ${parameters[0].charAt(0)}upgrade [ta/castle/hero] [current unit level] [gold, e.g. 12.345B]`)
        return embed
    }

    var multiplier = GetMultiplier(parameters[1])

    if (!multiplier)
    {
        embed.setDescription(`${username}, the accepted values for the first parameter, ${parameters[1]}, are [ta/castle/hero]`)
        return embed
    }
    
    let initialNumber = parseInt(parameters[2]);

    if (!initialNumber)
    {
        embed.setDescription(`${username}, the second parameter, ${parameters[2]}, is not a valid number`)
        return embed
    }

    if (multiplier === 5000 && initialNumber < 10000)
    {
        embed.setDescription(`${username}, sorry this command can't give an accurate value for heroes below level 10k`)
        return embed
    }


    let goldString = parameters[3]
    let gold = parseFloat(goldString.slice(0, goldString.length-1))
    let goldMultiplier = GetMultiplierFromUnit(goldString.charAt(goldString.length-1))

    if (!gold || !goldMultiplier)
    {
        embed.setDescription(`${username}, the last parameter, ${goldString}, is not a valid number + unit. The valid units are [B/T/Q]`)
        return embed
    }
    
    gold *= goldMultiplier

    var upgradeLevel = Math.round(Math.sqrt(Math.pow(initialNumber, 2)*multiplier+(2*gold))/Math.sqrt(multiplier))

    let embedDescription = `${username}, if you spend ${goldString} your ${parameters[1].toUpperCase()} level will be: \n\n ${upgradeLevel}`;
    
    embed.setColor(0x00AE86) // green for success
    .setDescription(embedDescription)
    return embed
}



function GetMultiplier(unitType: string) {
    var multiplier = 0
    switch (unitType.toLowerCase()) {
        case "ta":
            multiplier = 1000
            break;
        case "hero":
            multiplier = 5000
            break;
        case "castle":
            multiplier = 2500
            break;
    
        default:
            break;
    }
    return multiplier;
}


function GetMultiplierFromUnit(unitType: string) {
    var multiplier = 0
    switch (unitType.toLowerCase()) {
        case "b":
            multiplier = 1000000000
            break;
        case "t":
            multiplier = 1000000000000
            break;
        case "q":
            multiplier = 1000000000000000
            break;
    
        default:
            break;
    }
    return multiplier;
}