"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandle = void 0;
function generateProductUrlHandle({ objectID, name, priceValue }) {
    const merchantId = 'loropiana';
    const brand = 'loro-piana';
    const productId = objectID;
    const productName = name.en[0];
    const shortDescription = productName === null || productName === void 0 ? void 0 : productName.toLowerCase().replace(/[а-яё]+/g, '').replace(/\s+/g, '-').replaceAll('/', '');
    return `${brand}-${shortDescription}-${merchantId}-${productId}:${priceValue}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
