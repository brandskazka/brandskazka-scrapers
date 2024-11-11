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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFendiSearchResults = exports.defaultHeaders = void 0;
const utils_1 = require("./utils");
const utils_2 = require("@/lib/utils");
const algoliasearch_1 = __importDefault(require("algoliasearch"));
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "2432d2d29d010990eb08b1f31dcdebaf",
    "X-Algolia-Application-Id": "7VXQ9SKMZW",
    Dnt: "1",
};
const getFendiSearchResults = ({ page = "1", }) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const pageId = parseInt(page) - 1;
    const client = (0, algoliasearch_1.default)(exports.defaultHeaders["X-Algolia-Application-Id"], exports.defaultHeaders["X-Algolia-Api-Key"]);
    const index = client.initIndex("production_eu01_fendi_demandware_net__FR__products__en_FR");
    const result = yield index.search("", {
        attributesToRetrieve: ["*"],
        hitsPerPage: 50,
        page: pageId,
    });
    const { totalPages, totalItems, number: currentPage, } = {
        totalPages: Number(result === null || result === void 0 ? void 0 : result.nbPages),
        totalItems: Number(result === null || result === void 0 ? void 0 : result.nbHits),
        number: Number(result === null || result === void 0 ? void 0 : result.page),
    };
    const ruble_rate = yield (0, utils_2.getRubleRate)();
    // console.log(result.hits[0]);
    const price_converted_products = result === null || result === void 0 ? void 0 : result.hits.map((product) => {
        var _a, _b;
        return ({
            id: product.objectID,
            objectID: product.objectID,
            title: product.name,
            backend: "algolia",
            currency: "RUB",
            gender: [(_a = product.__primary_category) === null || _a === void 0 ? void 0 : _a["0"]],
            category: product.categories[0].map((x) => x.name),
            brand: {
                id: "fendi",
                name: "Fendi",
                description: "Fendi",
            },
            images: (_b = product.image_groups[0]) === null || _b === void 0 ? void 0 : _b.images.map(({ dis_base_link }, i) => ({
                url: dis_base_link,
                order: i + 1,
                size: "1000",
            })),
            slug: (0, utils_1.generateProductUrlHandle)(product),
            price: product.price.EUR * 1.2 * ruble_rate,
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
exports.getFendiSearchResults = getFendiSearchResults;
