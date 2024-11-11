"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductUrlHandleForSingleItem = exports.generateProductUrlHandleForSearchResultItem = void 0;
function generateProductUrlHandleForSearchResultItem({ id, name }) {
    const merchantId = 'dolcegabbana';
    const brand = 'dolcegabbana';
    const shortDescription = name
        .toLowerCase()
        .replace(/[а-яё]+/g, '')
        .replace(/\s+/g, '-');
    return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
exports.generateProductUrlHandleForSearchResultItem = generateProductUrlHandleForSearchResultItem;
function generateProductUrlHandleForSingleItem(item) {
    if (!item)
        return null;
    const { id, name } = item;
    const merchantId = 'dolcegabbana';
    const brand = 'dolcegabbana';
    const shortDescription = name === null || name === void 0 ? void 0 : name.toLowerCase().replace(/[а-яё]+/g, '').replace(/\s+/g, '-');
    return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
exports.generateProductUrlHandleForSingleItem = generateProductUrlHandleForSingleItem;
