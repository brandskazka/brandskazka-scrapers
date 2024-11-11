"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImage = void 0;
function formatImage(formatSize) {
    // Define the regular expression pattern to match the screen size at the end
    const pattern = /_[0-9]+x[0-9]+$/;
    // Remove the screen size at the end of the string
    return formatSize.replace(pattern, "_940x940");
}
exports.formatImage = formatImage;
