"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandle = void 0;
function generateProductUrlHandle({ objectID, Title }) {
    const merchantId = "miumiu";
    const brand = "miumiu";
    const shortDescription = Title.toLowerCase()
        .replace(/[а-яё]+/g, "")
        .replace(/\s+/g, "-");
    return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
