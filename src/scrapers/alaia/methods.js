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
exports.getAlaiaSearchResults = exports.defaultHeaders = void 0;
const node_html_parser_1 = require("node-html-parser");
const utils_1 = require("./utils");
const utils_2 = require("@/lib/utils");
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "60ae41b45f76d3fdbbefa93988cca3a4",
    "X-Algolia-Application-Id": "3GPIT4ZPFD",
    Dnt: "1",
};
const getAlaiaSearchResults = ({ page = "1", }) => __awaiter(void 0, void 0, void 0, function* () {
    const pageId = parseInt(page) - 1;
    const response = yield fetch(`https://www.maison-alaia.com/Search/RenderProductsAsync?agerange=&authorlocalized=&brand=&collection=&color=&colortype=&department=vwll&departmentId=&environment=&fabric=&fabricColor=&facetsvalue=&family=&filter=&gallery=&gender=&heeltype=&issale=&itembinding=&itemsToLoadOnNextPage=16&linkdepartment=&linkdepartmentId=&look=&macro=&macroMarchio=&material=&micro=&microcolor=&minMaxPrice=&model=&modelFabric=&modelnames=&occasion=&page=${pageId}&partialLoadedItems=16&price=&prints=&productsPerPage=16&rsiUsed=false&sale=False&salesline=&searchType=&season=&section=&site=&size=&sortRule=&stone=&structure=&style=&suggestion=false&suggestionValue=&textSearch=&textSearchFilters=&themecollection=&totalItems=501&totalPages=32&virtualnavigation=&waist=&washtype=&wedge=&weight=&ytosQuery=true&yurirulename=&siteCode=ALAIA_GB`);
    if (response.status !== 200) {
        const json = yield response.json();
        console.log(json);
        console.log("[EXCEPTION] search result error scrapers/alaia/methods.ts", "[ERROR] banned by alaia");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    const body = yield response.text();
    const $ = (0, node_html_parser_1.parse)(body);
    const hits = Array.from($.querySelectorAll(".product-box")).map((el) => {
        var _a, _b, _c, _d;
        const article = (el === null || el === void 0 ? void 0 : el.getAttribute("data-ytos-track-product-data")) || "";
        const image = ((_a = el.querySelector("a > div > img")) === null || _a === void 0 ? void 0 : _a.getAttribute("src")) || "";
        const code = ((_d = (_c = (_b = el
            .querySelector("a")) === null || _b === void 0 ? void 0 : _b.getAttribute("href")) === null || _c === void 0 ? void 0 : _c.replace("/fr/", "")) === null || _d === void 0 ? void 0 : _d.replace(".html", "")) || "";
        const formatted_article = JSON.parse(article);
        return {
            category: [
                formatted_article.product_category,
                formatted_article.product_macro_category,
                formatted_article.product_micro_category,
            ],
            name: formatted_article.product_title || "",
            price: formatted_article.product_discountedPrice || "",
            id: code.replace("/gb/", ""),
            image: image,
        };
    });
    const { totalPages, totalItems, number: currentPage, } = {
        totalPages: 12,
        totalItems: hits.length + 448,
        number: 1,
    };
    const ruble_rate = yield (0, utils_2.getRubleRate)();
    const price_converted_products = hits.map(({ name, price, id, image, category }, i) => ({
        id,
        objectID: id,
        title: name,
        currency: "RUB",
        gender: ["Women"],
        backend: "custom",
        category,
        brand: {
            id: "alaia",
            name: "Alaia",
            description: "Alaia",
        },
        images: [
            {
                url: image,
                order: i + 1,
                size: "1000",
            },
        ],
        slug: (0, utils_1.generateProductUrlHandleForSearchResultItem)({ name, id }),
        price: parseInt(price) * 1.2 * ruble_rate,
    }));
    return {
        totalItems: 501,
        totalPages: 32,
        currentPage,
        products: price_converted_products,
        categories: [],
    };
});
exports.getAlaiaSearchResults = getAlaiaSearchResults;
