"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CostFormatter_1 = __importDefault(require("./CostFormatter"));
exports.default = (initial, final, multiplier) => {
    let initialNumber = parseInt(initial);
    let finalNumber = parseInt(final);
    return (0, CostFormatter_1.default)(new Intl.NumberFormat('en-US').format((initialNumber + finalNumber) * (finalNumber - initialNumber) / 2 * multiplier).toString());
};
