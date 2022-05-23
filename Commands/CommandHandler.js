"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CostCalculator_1 = __importDefault(require("./CostCalculator/CostCalculator"));
const HeroCostCalculator_1 = __importDefault(require("./CostCalculator/HeroCostCalculator"));
const paceCalculator_1 = __importDefault(require("./PaceCalculator/paceCalculator"));
const resetCalculator_1 = __importDefault(require("./ResetCalculator/resetCalculator"));
exports.default = (client) => {
    client.on('messageCreate', (message) => {
        // make sure it's a command OR it's not send from welcome channel
        if ((!message.content.startsWith('!') && !message.content.startsWith('^')) || message.channelId === '720272056259838052') {
            return;
        }
        const messageStringList = message.content.split(' ');
        const commandName = messageStringList[0].substring(1).toLowerCase();
        let content;
        switch (commandName) {
            case 'pace':
                content = messageStringList.length == 2 ? (0, paceCalculator_1.default)(messageStringList[1]) : 'Needs one parameter for this command';
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                });
                break;
            case 'reset':
                message.reply({
                    content: (0, resetCalculator_1.default)(),
                    allowedMentions: { repliedUser: false }
                });
                break;
            case 'hero':
                content = messageStringList.length == 3 ? (0, HeroCostCalculator_1.default)(messageStringList[1], messageStringList[2]) : 'Needs two parameters for this command';
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                });
                break;
            case 'castle':
                content = messageStringList.length == 3 ? (0, CostCalculator_1.default)(messageStringList[1], messageStringList[2], 2500) : 'Needs two parameters for this command';
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                });
                break;
            case 'ta':
                content = messageStringList.length == 3 ? (0, CostCalculator_1.default)(messageStringList[1], messageStringList[2], 1000) : 'Needs two parameters for this command';
                message.reply({
                    content: content,
                    allowedMentions: { repliedUser: false }
                });
                break;
            default:
                break;
        }
    });
};
