"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interaction) => {
    let dt = new Date("2021-05-30T15:00:00Z");
    let dOffset = dt.getTime();
    let d = new Date();
    let dNowUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    let result = (dNowUTC - (dOffset + (1000 * 60 * 60 * 24) * 5 * Math.floor(Math.abs(dNowUTC - dOffset) / (1000 * 60 * 60 * 24) / 5))) / (1000 * 60 * 60 * 24);
    let pace = Math.floor(47076 / (result * 24) * 120);
    interaction.reply({
        content: `${pace}`
    });
};
