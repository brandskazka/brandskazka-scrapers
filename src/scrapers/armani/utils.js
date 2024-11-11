"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandle = void 0;
function generateProductUrlHandle({ objectID, nameEN, }) {
    const merchantId = "armani";
    const brand = "armani";
    const productId = objectID;
    const productName = nameEN;
    const shortDescription = productName === null || productName === void 0 ? void 0 : productName.toLowerCase().replace(/[а-яё]+/g, "").replace(/\s+/g, "-");
    return `${brand}-${shortDescription}-${merchantId}-${productId}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
