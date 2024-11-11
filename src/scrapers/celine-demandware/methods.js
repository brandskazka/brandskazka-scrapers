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
exports.getCelineSearchResults = exports.generateProductUrlHandle = void 0;
const utils_1 = require("@/lib/utils");
const cheerio_1 = require("cheerio");
function generateProductUrlHandle({ objectID, Title }) {
    const merchantId = "celine";
    const brand = "celine";
    const shortDescription = Title.toLowerCase()
        .replace(/[а-яё]+/g, "")
        .replace(/\s+/g, "-");
    return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
const getCelineSearchResults = ({ page = "1", }) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const pageId = parseInt(page) - 1;
    const gender = "Men";
    const products = [];
    // q=women&prefn1=celShowInSearch&prefv1=true&start=40&sz=20
    const searchParams = new URLSearchParams({
        q: "women",
        prefn1: "celShowInSearch",
        prefv1: "true",
        start: String(pageId * 20),
        sz: "20",
    });
    const ruble_rate = yield (0, utils_1.getRubleRate)();
    const response = yield fetch(`https://www.celine.com/on/demandware.store/Sites-CELINE_FR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`);
    const html = yield response.text();
    const $ = (0, cheerio_1.load)(html);
    if (response.status !== 200) {
        console.log("response status is bad in getCelineSearchResults");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    //   fs.writeFileSync("body.html", html, "utf8");
    $(".m-product-listing").each((i, el) => {
        const product = $(el);
        const images = [];
        const unparsed_json = product.find("a").attr("data-gtm-data");
        const json = JSON.parse(decodeURIComponent(unparsed_json));
        $(el)
            .find(".m-product-listing__img-img > img")
            .each((i, img_el) => {
            const image = $(img_el).attr("data-lazy-srcset");
            images.push({
                url: (0, utils_1.parseSrcSet)(image),
                order: i + 1,
                size: "1000",
            });
        });
        products.push({
            id: json.id,
            objectID: json.id,
            title: json.name,
            currency: "RUB",
            gender: [gender],
            category: [
                json === null || json === void 0 ? void 0 : json.category,
                json === null || json === void 0 ? void 0 : json.productMidCategory,
                json === null || json === void 0 ? void 0 : json.productSuperCategory,
                json === null || json === void 0 ? void 0 : json.productMasterId,
            ],
            brand: {
                id: "celine",
                name: "Celine",
                description: "Celine",
            },
            images,
            slug: generateProductUrlHandle({ objectID: json.id, Title: json.name }),
            price: json.price * 1.2 * ruble_rate,
        });
    });
    const totalPages = $(".o-search_options-pagination").children().length;
    return {
        totalItems: totalPages * 20,
        totalPages,
        currentPage: pageId,
        products: products,
        categories: [],
    };
});
exports.getCelineSearchResults = getCelineSearchResults;
