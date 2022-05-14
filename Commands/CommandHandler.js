"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paceCalculator_1 = __importDefault(require("./PaceCalculator/paceCalculator"));
exports.default = (client) => {
    client.on('messageCreate', (message) => {
        // make sure it's a command OR it's not send from welcome channel
        if (!message.content.startsWith('!') || message.channelId === '720272056259838052') {
            return;
        }
        const messageStringList = message.content.split(' ');
        const commandName = messageStringList[0].substring(1);
        switch (commandName) {
            case 'pace':
                let content = messageStringList.length == 2 ? (0, paceCalculator_1.default)(messageStringList[1]) : 'Needs only one parameter for this command';
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
