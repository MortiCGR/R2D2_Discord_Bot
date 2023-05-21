"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CostCalculator_1 = __importDefault(require("./CostCalculator/CostCalculator"));
const HeroCostCalculator_1 = __importDefault(require("./CostCalculator/HeroCostCalculator"));
const paceCalculator_1 = __importDefault(require("./PaceCalculator/paceCalculator"));
const resetCalculator_1 = __importDefault(require("./ResetCalculator/resetCalculator"));
const UpgradesCalculator_1 = __importDefault(require("./UpgradesCalculator/UpgradesCalculator"));
const RatioCalculator_1 = __importDefault(require("./RatioCalculator/RatioCalculator"));
const TabCalculator_1 = __importDefault(require("./TabCalculator/TabCalculator"));
exports.default = (client) => {
    client.on('messageCreate', (message) => {
        // to safely test commands in test server
        // if (message.guildId != "963913950041370676")
        // {
        //     return
        // }
        var _a, _b, _c;
        // make sure it's a command OR it's not send from welcome channel
        if ((!message.content.startsWith('!') && !message.content.startsWith('^')) || message.channelId === '720272056259838052') {
            return;
        }
        const username = (_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName;
        let messageStringList = message.content.toLowerCase().split(' ');
        const commandName = messageStringList[0].substring(1);
        let isWeirdNumber = false;
        messageStringList = messageStringList.map(element => {
            if (element.endsWith("k")) {
                element = element.replace(/k/g, "000");
            }
            let elementNumber = parseInt(element);
            if (elementNumber > 3000000) {
                isWeirdNumber = true;
            }
            return element;
        });
        if (isWeirdNumber) {
            let warningEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Warning ${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.emojis.cache.find(emoji => emoji.name === 'pepe_earth_clown')}`)
                .setColor(0xCC0000)
                .setDescription(`${username} stop testing me, don't be a ${(_c = message.guild) === null || _c === void 0 ? void 0 : _c.emojis.cache.find(emoji => emoji.name === 'pepe_clown')}`);
            message.channel.send({ embeds: [warningEmbed] });
            return;
        }
        switch (commandName) {
            case 'help':
                let embed = new discord_js_1.MessageEmbed()
                    .setTitle("Help Command")
                    .setColor(0x00AE86)
                    .setDescription("Type ^ or ! as a prefix for a command")
                    .addFields({ name: "^reset", value: "returns reset timers for Guild Season, Season Colonies and Hell Mode." }, { name: "^pace [seasonal waves] [OPTIONAL target pace]", value: "returns an estimate for your waves for the rest of that guild season, based on the number that you put in and hours elapsed in the season so far. Optionally it returns how many waves you should have done to reach your target pace" }, { name: "^ratio [career wave] [ratio]", value: "returns the level of the unit you should have based on your wave and your desired ratio." }, { name: "^hero [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^hero 1 10000" }, { name: "^castle [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^castle 50000 60000" }, { name: "^ta [initial level] [final level]", value: "returns the gold difference for levelling from start to end.\nE.g. ^TA 10000 20000" }, { name: "^upgrade [ta/castle/hero][initial level] [gold, e.g. 12.345B]", value: "returns the level you will upgrade your unit based on the initial level and the amount of gold. Valid units for gold B/T/Q. This command doesn't work when the initial level of a hero is below level 10k\nE.g. !upgrade TA 10000 200.5B" }, { name: "^tab [avg wave time in seconds] [gpw]", value: "returns the gold per hour that you get with TAB.\nE.g. ^TAB 32.5 550" }, { name: "^guide", value: "Link to Remmy's phys/summon guide." });
                message.channel.send({ embeds: [embed] });
                break;
            case 'pace':
                message.channel.send({ embeds: [(0, paceCalculator_1.default)(username, messageStringList)] });
                break;
            case 'ratio':
                message.channel.send({ embeds: [(0, RatioCalculator_1.default)(username, messageStringList)] });
                break;
            case 'reset':
                message.channel.send({ embeds: [(0, resetCalculator_1.default)()] });
                break;
            case 'tower':
            case 'leader':
            case 'hero':
                message.channel.send({ embeds: [(0, HeroCostCalculator_1.default)(username, messageStringList)] });
                break;
            case 'castle':
                message.channel.send({ embeds: [(0, CostCalculator_1.default)(username, messageStringList, 2500)] });
                break;
            case 'ta':
                message.channel.send({ embeds: [(0, CostCalculator_1.default)(username, messageStringList, 1000)] });
                break;
            case 'upgrade':
                message.channel.send({ embeds: [(0, UpgradesCalculator_1.default)(username, messageStringList)] });
                break;
            case 'tab':
                message.channel.send({ embeds: [(0, TabCalculator_1.default)(username, messageStringList)] });
                break;
            case 'guide':
                let guideEmbed = new discord_js_1.MessageEmbed()
                    .setTitle("Link to Remmy's phys/summon guide.")
                    .setColor(0x00AE86)
                    .setDescription("You could find this in the pins in Learning and tips.\n https://discord.com/channels/384022146768175106/625383601269243924/1080172399774924920");
                message.channel.send({ embeds: [guideEmbed] });
                break;
            default:
                let errorEmbed = new discord_js_1.MessageEmbed()
                    .setTitle("Wrong command.")
                    .setColor(0xCC0000)
                    .setDescription(`"${commandName}" is not a valid command, try ^help to find the list of all the valid commands`);
                message.channel.send({ embeds: [errorEmbed] });
                break;
        }
    });
};
