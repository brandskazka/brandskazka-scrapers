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
exports.getBottegaSearchResults = exports.generateProductUrlHandle = void 0;
const utils_1 = require("@/lib/utils");
const cheerio_1 = require("cheerio");
function generateProductUrlHandle({ objectID, Title }) {
    const merchantId = "bottega";
    const brand = "bottega";
    const shortDescription = Title.toLowerCase()
        .replace(/[а-яё]+/g, "")
        .replace(/\s+/g, "-");
    return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
const getBottegaSearchResults = ({ page = "1", }) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const pageId = parseInt(page) - 1;
    const gender = "Women";
    const products = [];
    const searchParams = new URLSearchParams({
        q: "",
        prefn1: "akeneo_employeesSalesVisible",
        prefv1: "false",
        prefn2: "akeneo_gender",
        prefv2: gender === "Women" ? "D" : "U",
        prefn3: "akeneo_markDownInto",
        prefv3: "no_season",
        prefn4: "countryInclusion",
        prefv4: "FR",
        start: String(pageId * 20),
        sz: "20",
    });
    const ruble_rate = yield (0, utils_1.getRubleRate)();
    // console.log(
    //   `https://www.bottegaveneta.com/on/demandware.store/Sites-BV-R-WEUR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`
    // );
    const response = yield fetch(`https://www.bottegaveneta.com/on/demandware.store/Sites-BV-R-WEUR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`);
    const html = yield response.text();
    const $ = (0, cheerio_1.load)(html);
    if (response.status !== 200) {
        console.error("response status is bad in getCelineSearchResults");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    //   fs.writeFileSync("body.html", html, "utf8");
    $(`article[class="c-product"]`).each((i, el) => {
        const product = $(el);
        const images = [];
        const unparsed_json = product.attr("data-gtmproduct");
        const json = JSON.parse(decodeURIComponent(unparsed_json));
        $(el)
            .find(".c-product__image")
            .each((i, img_el) => {
            const image = $(img_el).attr("srcset");
            images.push({
                url: (0, utils_1.parseSrcSet)(image),
                order: i + 1,
                size: "1000",
            });
        });
        const item = {
            id: json.id,
            objectID: json.id,
            title: json.name,
            currency: "RUB",
            gender: [gender],
            backend: "salesforce",
            category: json === null || json === void 0 ? void 0 : json.category.split("-"),
            brand: {
                id: "bottega",
                name: "Bottega Veneta",
                description: "Bottega Veneta",
            },
            images,
            slug: generateProductUrlHandle({ objectID: json.id, Title: json.name }),
            price: json.discountPrice * 1.2 * ruble_rate,
        };
        // console.item(item);
        products.push(item);
    });
    const regex = /of (\d+) products/;
    const totalItems_match = $(".c-loadmore__count").text().match(regex) || [];
    const totalItems = parseInt(totalItems_match[1], 10);
    return {
        totalItems: totalItems * 20,
        totalPages: Math.ceil(totalItems / 20),
        currentPage: pageId,
        products: products,
        categories: [],
    };
});
exports.getBottegaSearchResults = getBottegaSearchResults;
