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
exports.getLoroPianaProduct = exports.getLoroPianaSearchResults = exports.defaultHeaders = void 0;
const utils_1 = require("@/lib/utils");
const utils_2 = require("./utils");
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "003d95baf1320c35a529f975ec5b7d33",
    "X-Algolia-Application-Id": "L4PM4BBNFK",
    Dnt: "1",
};
const getLoroPianaSearchResults = ({ page = "1", genderSlug, searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    const pageId = parseInt(page) - 1;
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser; instantsearch.js (4.57.0); Vue (3.2.31); Vue InstantSearch (4.10.12); JS Helper (3.14.2)",
    });
    const query = "";
    // genderSlug + (category ? ` ${category}` : searchValue.length > 2 ? ` ${searchValue}` : '');
    const payload = {
        query,
        attributesToRetrieve: ["*"],
        // facetFilters: ["isValid:true", "showDigitalWorldOnly:false"],
        // facets: [
        //   "categoryPathName.en",
        //   "categoryPathName.it",
        //   "categoryPathName.fr",
        //   "categoryPathName.de",
        //   "categoryPathName.ru",
        //   "categoryPathName.ja",
        //   "categoryPathName.zh",
        //   "categoryPathName.ko",
        //   "categoryPathName.ar",
        //   "categoryPathName.en_us",
        // ],
        // clickAnalytics: true,
        // analytics: true,
        hitsPerPage: 50,
        page: pageId,
    };
    const response = yield fetch(`https://l4pm4bbnfk-dsn.algolia.net/1/indexes/prod_loropianaEU_ONLINE_FR/query?${searchParams.toString()}`, {
        method: "POST",
        headers: exports.defaultHeaders,
        body: JSON.stringify(payload),
    });
    const result = yield response.json();
    if (response.status !== 200) {
        console.log(result);
        console.log("[EXCEPTION] search result error scrapers/loro-piana/methods.ts", "[ERROR] banned by Loro Piana", "[ERROR] banned by Loro Piana");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    if (!result.hits || result.hits.length === 0) {
        console.log(result);
        console.log("[EXCEPTION] search result error scrapers/loro-piana/methods.ts", "[ERROR] Results not found on Loro Piana, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    const { totalPages, totalItems, number: currentPage, } = {
        totalPages: Number(result === null || result === void 0 ? void 0 : result.nbPages),
        totalItems: Number(result === null || result === void 0 ? void 0 : result.nbHits),
        number: Number(result === null || result === void 0 ? void 0 : result.page),
    };
    const ruble_rate = yield (0, utils_1.getRubleRate)();
    console.log(result === null || result === void 0 ? void 0 : result.hits);
    const price_converted_products = result === null || result === void 0 ? void 0 : result.hits.map((product) => {
        var _a, _b, _c;
        return ((_b = (_a = product === null || product === void 0 ? void 0 : product.name) === null || _a === void 0 ? void 0 : _a.en) === null || _b === void 0 ? void 0 : _b.length) > 0
            ? {
                id: product.objectID,
                objectID: product.objectID,
                title: product.name.en[0],
                currency: "RUB",
                brand: {
                    id: "loropiana",
                    name: "Loro Piana",
                    description: "Loro Piana",
                },
                variants: ((_c = product === null || product === void 0 ? void 0 : product.size) === null || _c === void 0 ? void 0 : _c.map((size) => ({
                    id: size,
                    size: size,
                    price: Number(product.priceValue) * 1.2 * ruble_rate,
                    type: "Size",
                }))) || [],
                gender: [
                    (0, utils_1.capitalizeFirstLetter)(product.genderNameEn)
                        .replace("Man", "Men")
                        .replace("Woman", "Women"),
                ],
                category: product.categoryName.en,
                images: (() => {
                    const images = new Array();
                    if (product.imgfrontsmall) {
                        images.push({
                            url: product.imgfrontsmall,
                            order: 1,
                            size: "1000",
                        });
                    }
                    if (product.imgbacksmall) {
                        images.push({
                            url: product.imgbacksmall,
                            order: 2,
                            size: "1000",
                        });
                    }
                    return images;
                })(),
                slug: (0, utils_2.generateProductUrlHandle)(product),
                price: product.priceValue * 1.2 * ruble_rate,
            }
            : undefined;
    });
    return {
        totalItems,
        totalPages,
        currentPage,
        products: price_converted_products,
        categories: [],
    };
});
exports.getLoroPianaSearchResults = getLoroPianaSearchResults;
const getLoroPianaProduct = ({ productId: queryProductId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const [productId, price] = decodeURIComponent(queryProductId).split(":");
    const response = yield fetch(`https://fr.loropiana.com/en/api/pdp/product-variants?articleCode=${productId}`, {
        headers: exports.defaultHeaders,
    });
    if (response.status !== 200) {
        return null;
    }
    const rubles_rate = yield (0, utils_1.getRubleRate)();
    const results = yield response.json();
    const result = results === null || results === void 0 ? void 0 : results[0];
    if (!result) {
        console.log("scraper/loro-piana/methods :: product not found");
        return null;
    }
    const product_variants = result.sizes.map(({ code, variantCode }) => {
        return {
            id: variantCode,
            size: code,
            price: Number(price) * 1.2 * rubles_rate,
            type: "Size",
        };
    });
    const product = {
        id: productId,
        slug: `loro-piana-product-loropiana-${productId}`,
        title: result.productName,
        brand: {
            id: "loropiana",
            name: "Loro Piana",
            description: "Loro Piana",
        },
        styleId: ``,
        merchantId: "loropiana",
        madeIn: result.originCountry,
        categories: [],
        description: result.description,
        images: result.imagesContainers
            .map(({ formats }, i) => {
            const image = formats.find(({ format }) => format === "MEDIUM");
            return {
                url: image === null || image === void 0 ? void 0 : image.url,
                size: "1000",
                order: i + 1,
            };
        })
            .slice(0, 5),
        variants: product_variants,
    };
    return product;
});
exports.getLoroPianaProduct = getLoroPianaProduct;
