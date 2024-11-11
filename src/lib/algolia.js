"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const client = (0, algoliasearch_1.default)("7VXQ9SKMZW", "2432d2d29d010990eb08b1f31dcdebaf");
exports.index = client.initIndex("products");
// export const index = client.initIndex("products_raw");
