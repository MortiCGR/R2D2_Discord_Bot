"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = (username, parameters) => {
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Ratio Calculator")
        .setColor(0xCC0000); // red for errors
    if (parameters.length != 3) {
        embed.setDescription(`${username}, the correct format of this command is:\n ${parameters[0]} [career wave] [ratio]\n E.g. ${parameters[0]} 400k 0.05`);
        return embed;
    }
    let wave = parameters[1];
    let waveNumber = parseFloat(wave);
    if (!waveNumber) {
        embed.setDescription(`${username}, the first parameter, ${wave}, is not a valid number`);
        return embed;
    }
    let ratio = parameters[2];
    let ratioNumber = parseFloat(ratio);
    if (!ratioNumber) {
        embed.setDescription(`${username}, the second parameter, ${ratio}, is not a valid number`);
        return embed;
    }
    let embedDescription = `${username}, at wave ${wave} and ratio ${ratio} your unit level should be: \n\n ${(Math.floor(waveNumber * ratioNumber)).toString()}`;
    embed.setColor(0x00AE86) // green for success
        .setDescription(embedDescription);
    return embed;
};
