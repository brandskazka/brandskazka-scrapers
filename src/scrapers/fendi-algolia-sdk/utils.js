"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandle = void 0;
function generateProductUrlHandle({ id, name }) {
    const merchantId = "fendi";
    const brand = "fendi";
    const shortDescription = name
        .toLowerCase()
        .replace(/[а-яё]+/g, "")
        .replace(/\s+/g, "-");
    return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
