"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandle = void 0;
function generateProductUrlHandle(product) {
    const merchantId = 'lv';
    const brand = 'louis-vuitton';
    const shortDescription = product.name
        .toLowerCase()
        .replace(/[а-яё]+/g, '')
        .replace(/\s+/g, '-');
    return `${brand}-${shortDescription}-${merchantId}-${product.productId ||
        product.productId}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
