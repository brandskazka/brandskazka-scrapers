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
exports.getPradaSearchResults = exports.getPradaDeliveryEstimates = exports.defaultHeaders = void 0;
const utils_1 = require("./utils");
const utils_2 = require("@/lib/utils");
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "9ae6ea7f6450bcb8343c62c96b2cbee3",
    "X-Algolia-Application-Id": "OCPT799JD8",
    Dnt: "1",
};
const getPradaDeliveryEstimates = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    // const response = await fetch(
    //   `https://api.prada.com/anon/mwstorestore/byFilterStore?productId=${id}`,
    //   {
    //     headers: {
    //       ...defaultHeaders,
    //       Storeid: 'miuMiuStore-FR'
    //     }
    //   }
    // );
    // const json: any = await response.json();
    // const isExpress = json?.data?.[0]?.PhysicalStore?.length > 0;
    // console.log(response.status, json);
    const isExpress = true;
    return {
        data: {
            merchantDeliveryDate: new Date(Date.now() + (isExpress ? 345600000 : 691000000)),
            deliveryDate: new Date(Date.now() + (isExpress ? 345600000 : 691000000)),
            isExpress: Boolean(isExpress),
            isFallback: true,
        },
    };
});
exports.getPradaDeliveryEstimates = getPradaDeliveryEstimates;
const getPradaSearchResults = ({ page = "1", genderSlug = "women", searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ``;
    const pageId = parseInt(page) - 1;
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser; instantsearch.js (4.57.0); Vue (3.2.31); Vue InstantSearch (4.10.12); JS Helper (3.14.2)",
    });
    const payload = {
        query,
        attributesToRetrieve: ["*"],
        hitsPerPage: 50,
        page: pageId,
    };
    const response = yield fetch(`https://ocpt799jd8-dsn.algolia.net/1/indexes/Prada_FR_en/query?${searchParams.toString()}`, {
        method: "POST",
        headers: exports.defaultHeaders,
        body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
        console.log("[EXCEPTION] search result error scrapers/prada/methods.ts", "[ERROR] banned by Prada", "[ERROR] banned by Prada");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    const result = yield response.json();
    if (!result.hits || result.hits.length === 0) {
        console.log(result);
        console.log("[EXCEPTION] search result error scrapers/prada/methods.ts", "[ERROR] Results not found on Prada, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR");
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
    const price_converted_products = result === null || result === void 0 ? void 0 : result.hits.map((product) => {
        var _a;
        return ({
            id: product.objectID,
            objectID: product.objectID,
            title: product.Title,
            currency: "RUB",
            gender: product.Gender,
            category: Object.keys(product.ALGcategories).map((key) => product.ALGcategories[key][0]),
            brand: {
                id: "prada",
                name: "Prada",
                description: "Prada",
            },
            images: ((_a = product === null || product === void 0 ? void 0 : product.Images) === null || _a === void 0 ? void 0 : _a.map(({ link }, i) => ({
                url: link,
                order: i + 1,
                size: "1000",
            }))) || [],
            slug: (0, utils_1.generateProductUrlHandle)(product),
            price: product.Price.value * 1.2 * ruble_rate,
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
exports.getPradaSearchResults = getPradaSearchResults;
