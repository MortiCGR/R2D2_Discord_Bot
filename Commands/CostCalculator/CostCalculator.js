"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CostFormatter_1 = __importDefault(require("./CostFormatter"));
exports.default = (username, parameters, multiplier) => {
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Unit Cost Calculator")
        .setColor(0xCC0000); // red for errors
    if (parameters.length != 3) {
        embed.setDescription(`${username}, the correct format of this command is:\n ${parameters[0]} [initial unit level] [final unit level]\n E.g. ${parameters[0]} 10k 50k`);
        return embed;
    }
    let initial = parameters[1];
    let initialNumber = parseInt(initial);
    initialNumber = initialNumber === 0 ? 1 : initialNumber;
    if (!initialNumber) {
        embed.setDescription(`${username}, the first parameter, ${initial}, is not a valid number`);
        return embed;
    }
    let final = parameters[2];
    let finalNumber = parseInt(final);
    if (!initialNumber) {
        embed.setDescription(`${username}, the second parameter, ${final}, is not a valid number`);
        return embed;
    }
    let cost = 0;
    if (finalNumber <= initialNumber) {
        embed.setDescription(`${username}, the second parameter, ${final}, lower than the first parameter ${initial}`);
        return embed;
    }
    cost = (initialNumber + finalNumber) * (finalNumber - initialNumber) / 2 * multiplier;
    let embedDescription = `${username}, the cost to upgrade your unit from level ${initial} to level ${final} will be: \n\n ${(0, CostFormatter_1.default)(new Intl.NumberFormat('en-US').format(cost).toString())}`;
    embed.setColor(0x00AE86) // green for success
        .setDescription(embedDescription);
    return embed;
};
