"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImage = exports.generateProductUrlHandleForSingleItem = exports.generateProductUrlHandleForSearchResultItem = void 0;
function generateProductUrlHandleForSearchResultItem({ id, name }) {
    const merchantId = 'alaia';
    const brand = 'alaia';
    const shortDescription = name === null || name === void 0 ? void 0 : name.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').replaceAll('/', '-');
    return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
exports.generateProductUrlHandleForSearchResultItem = generateProductUrlHandleForSearchResultItem;
function generateProductUrlHandleForSingleItem({ id, name }) {
    const merchantId = 'goldengoose';
    const brand = 'goldengoose';
    const shortDescription = name === null || name === void 0 ? void 0 : name.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').replaceAll('/', '-');
    return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
exports.generateProductUrlHandleForSingleItem = generateProductUrlHandleForSingleItem;
function formatImage(formatSize) {
    // Define the regular expression pattern to match the screen size at the end
    const pattern = /_[0-9]+x[0-9]+$/;
    // Remove the screen size at the end of the string
    return formatSize.replace(pattern, '_940x940');
}
exports.formatImage = formatImage;
