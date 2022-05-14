"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (waves) => {
    let wavesNumber = parseInt(waves);
    let dt = new Date("2021-05-30T16:00:00Z");
    let dOffset = dt.getTime();
    let d = new Date();
    let dNowUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    let result = (dNowUTC - (dOffset + (1000 * 60 * 60 * 24) * 5 * Math.floor(Math.abs(dNowUTC - dOffset) / (1000 * 60 * 60 * 24) / 5))) / (1000 * 60 * 60 * 24);
    let pace = Math.floor(wavesNumber / (result * 24) * 120);
    return pace.toString();
};
