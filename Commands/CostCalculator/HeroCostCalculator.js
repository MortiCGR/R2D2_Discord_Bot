"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CostFormatter_1 = __importDefault(require("./CostFormatter"));
exports.default = (username, parameters) => {
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
    let multiplier = GetMultiplier(finalNumber);
    if (GetMultiplier(initialNumber) === multiplier) {
        cost = calculateCost(initialNumber, finalNumber, multiplier);
    }
    else {
        let costIntervals = [
            { level: 1, maxLevel: 21, cost: 250 },
            { level: 21, maxLevel: 41, cost: 500 },
            { level: 41, maxLevel: 61, cost: 750 },
            { level: 61, maxLevel: 81, cost: 1000 },
            { level: 81, maxLevel: 101, cost: 1250 },
            { level: 101, maxLevel: 121, cost: 1500 },
            { level: 121, maxLevel: 141, cost: 1750 },
            { level: 141, maxLevel: 161, cost: 2000 },
            { level: 161, maxLevel: 181, cost: 2250 },
            { level: 181, maxLevel: 201, cost: 2500 },
            { level: 201, maxLevel: 5001, cost: 3000 },
            { level: 5001, maxLevel: 9999, cost: 4000 },
            { level: 10000, maxLevel: 100000000, cost: 5000 },
        ];
        let tempInitialLevel = initialNumber;
        let i = 0;
        while (i < costIntervals.length || tempInitialLevel < finalNumber) {
            let element = costIntervals[i];
            if ((between(initialNumber, element.level, element.maxLevel) || between(tempInitialLevel, element.level, element.maxLevel))) {
                let maxLevel = element.maxLevel < finalNumber ? element.maxLevel : finalNumber;
                cost += calculateCost(tempInitialLevel, maxLevel, element.cost);
                tempInitialLevel = maxLevel;
                if (maxLevel + 1 === 10000) {
                    cost += 40000000;
                    tempInitialLevel = maxLevel + 1;
                }
            }
            else if (element.level >= 10000) {
                cost += calculateCost(tempInitialLevel, finalNumber, element.cost);
            }
            i++;
        }
    }
    let embedDescription = `${username}, the cost to upgrade your unit from level ${initial} to level ${final} will be: \n\n ${(0, CostFormatter_1.default)(new Intl.NumberFormat('en-US').format(cost).toString())}`;
    embed.setColor(0x00AE86) // green for success
        .setDescription(embedDescription);
    return embed;
};
function calculateCost(initial, final, multiplier) {
    return (initial + final) * (final - initial) / 2 * multiplier;
}
function GetMultiplier(x) {
    if (between(x, 1, 20)) {
        return 250;
    }
    else if (between(x, 21, 40)) {
        return 500;
    }
    else if (between(x, 41, 60)) {
        return 750;
    }
    else if (between(x, 61, 80)) {
        return 1000;
    }
    else if (between(x, 81, 100)) {
        return 1250;
    }
    else if (between(x, 101, 120)) {
        return 1500;
    }
    else if (between(x, 121, 140)) {
        return 1750;
    }
    else if (between(x, 141, 160)) {
        return 2000;
    }
    else if (between(x, 161, 180)) {
        return 2250;
    }
    else if (between(x, 181, 200)) {
        return 2500;
    }
    else if (between(x, 201, 5000)) {
        return 3000;
    }
    else if (between(x, 5001, 9999)) {
        return 4000;
    }
    else if (x >= 10000) {
        return 5000;
    }
    return 0;
}
function between(x, min, max) {
    return x >= min && x <= max;
}
