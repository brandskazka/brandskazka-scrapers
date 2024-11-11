"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImage = exports.generateProductUrlHandle = void 0;
const data_1 = require("./data");
function generateProductUrlHandle({ objectID, title_int, }) {
    const merchantId = data_1.siteName;
    const brand = data_1.siteName;
    const shortDescription = title_int === null || title_int === void 0 ? void 0 : title_int.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace("/", "-");
    return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
function formatImage(formatSize) {
    // Define the regular expression pattern to match the screen size at the end
    const pattern = /_[0-9]+x[0-9]+$/;
    // Remove the screen size at the end of the string
    return formatSize.replace(pattern, "_940x940");
}
exports.formatImage = formatImage;
