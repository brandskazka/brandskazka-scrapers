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
exports.getArmaniSearchResults = exports.defaultHeaders = void 0;
const utils_1 = require("./utils");
const utils_2 = require("@/lib/utils");
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "b0df34652f902a1081829a52886c62f0",
    "X-Algolia-Application-Id": "4TMW581MNH",
    Dnt: "1",
};
const getArmaniSearchResults = ({ page = "1", genderSlug, searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    const pageId = parseInt(page) - 1;
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser; instantsearch.js (4.57.0); Vue (3.2.31); Vue InstantSearch (4.10.12); JS Helper (3.14.2)",
    });
    const query = ``;
    const payload = {
        query,
        page: pageId,
        hitsPerPage: 100,
        attributesToRetrieve: ["*"],
    };
    const response = yield fetch(`https://4tmw581mnh-dsn.algolia.net/1/indexes/ynap_en_fr/query?${searchParams.toString()}`, {
        method: "POST",
        headers: exports.defaultHeaders,
        body: JSON.stringify(payload),
    });
    const result = yield response.json();
    if (response.status !== 200) {
        console.log(result);
        console.log("[EXCEPTION] search result error scrapers/armani/methods.ts", "[ERROR] banned by armani", "[ERROR] banned by armani");
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
        console.log("[EXCEPTION] search result error scrapers/armani/methods.ts", "[ERROR] Results not found on Loro Piana, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR");
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
    const ruble_rate = yield (0, utils_2.getRubleRate)();
    console.log(result.hits[0]._highlightResult);
    const price_converted_products = result === null || result === void 0 ? void 0 : result.hits.map((product) => {
        var _a, _b;
        return ({
            id: product.objectID,
            objectID: product.objectID,
            backend: "algolia",
            title: (product === null || product === void 0 ? void 0 : product.nameEN) || ((_b = (_a = product === null || product === void 0 ? void 0 : product._highlightResult) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.value) || "",
            currency: "RUB",
            gender: [product._highlightResult.Gender[0].value],
            category: [
                product._highlightResult.productType.value,
                product._highlightResult.subType.value,
            ],
            brand: {
                id: "armani",
                name: "Armani",
                description: "Armani",
            },
            images: [
                {
                    url: product.image.replace("//", ""),
                    order: 1,
                    size: "1000",
                },
            ],
            slug: (0, utils_1.generateProductUrlHandle)(product),
            price: product.price * 1.2 * ruble_rate,
        });
    });
    return {
        totalItems,
        totalPages,
        currentPage,
        products: price_converted_products,
        categories: [],
    };
});
exports.getArmaniSearchResults = getArmaniSearchResults;
