"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSrcSet = exports.removeHtmlTags = exports.capitalizeFirstLetter = exports.calculateTotalItemsPrice = exports.generateRandomString = exports.sleep = exports.parseProductUrlHandle = exports.getRubleRate = exports.formatPrice = exports.roundUpPrice = exports.ensureStartsWith = exports.parseCookie = exports.logger = void 0;
const data_1 = require("./data");
const currentTime = new Date().toLocaleTimeString();
exports.logger = {
    DEV_LOG_ONLY: (...props) => {
        if (data_1.IS_DEV_MODE) {
            console.log(`${currentTime} ::`, ...props);
        }
    },
};
const parseCookie = (cookieName) => {
    if (typeof document === "undefined")
        return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};
exports.parseCookie = parseCookie;
const ensureStartsWith = (stringToCheck, startsWith) => stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
exports.ensureStartsWith = ensureStartsWith;
function roundUpPrice(price) {
    return Math.ceil(Number(price) / 100) * 100;
}
exports.roundUpPrice = roundUpPrice;
function formatPrice(number) {
    // Convert the number to a string
    const formattedPrice = roundUpPrice(number);
    const numberString = String(formattedPrice.toFixed(0));
    // Split the string into groups of three digits from the right
    const groups = numberString.split(/(?=(?:\d{3})+(?!\d))/);
    // Join the groups with a space and return the result
    return groups.join(" ");
}
exports.formatPrice = formatPrice;
function getRubleRate() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://open.er-api.com/v6/latest/EUR");
        const json = yield response.json();
        if (response.ok) {
            const rate = Number((_a = json === null || json === void 0 ? void 0 : json.rates) === null || _a === void 0 ? void 0 : _a["RUB"]);
            return rate;
        }
        else {
            return 0;
        }
    });
}
exports.getRubleRate = getRubleRate;
function parseProductUrlHandle(handle) {
    let variantId;
    if (handle.startsWith("http")) {
        const url = new URL(handle);
        const searchParams = url.searchParams.toString();
        if (searchParams) {
            handle = handle.replace(url.search, "");
            variantId = url.searchParams.get("variant") || undefined;
        }
    }
    const parts = handle.split(/--|-/);
    if (parts.length >= 3) {
        const merchantId = parts[parts.length - 2];
        const productId = parts[parts.length - 1];
        return { merchantId, productId, variantId };
    }
    // Return a default object or handle this case according to your needs
    return { merchantId: "...", productId: "" };
}
exports.parseProductUrlHandle = parseProductUrlHandle;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const calculateTotalItemsPrice = (cartItems) => {
    const deliveryPrice = cartItems.reduce((acc, { variant }) => {
        return acc + ((variant === null || variant === void 0 ? void 0 : variant.price) || 0);
    }, 0);
    return deliveryPrice;
};
exports.calculateTotalItemsPrice = calculateTotalItemsPrice;
function capitalizeFirstLetter(string) {
    if (typeof string !== "string" || string.length === 0) {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function removeHtmlTags(input) {
    return input === null || input === void 0 ? void 0 : input.replace(/<[^>]*>/g, "");
}
exports.removeHtmlTags = removeHtmlTags;
const parseSrcSet = (srcSet) => {
    if (!srcSet)
        return null;
    // Regex to match the URL and its associated descriptor (1x, 2x, 1920w, etc.)
    const regex = /([^\s]+)\s+(\d+w|\d+x)/g;
    let match;
    const sources = [];
    // Iterate over all matches
    while ((match = regex.exec(srcSet)) !== null) {
        const url = match[1];
        const descriptor = match[2];
        const value = parseInt(descriptor, 10); // Parse the numeric part of the descriptor
        // Store the URL and its numeric descriptor value
        sources.push({ url, value });
    }
    // Sort the sources by their descriptor value in descending order
    sources.sort((a, b) => b.value - a.value);
    // Return the URL with the highest descriptor value
    return sources.length > 0 ? sources[0].url : null;
};
exports.parseSrcSet = parseSrcSet;
