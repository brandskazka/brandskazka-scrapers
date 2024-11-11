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
exports.getGucciProduct = exports.getGucciSearchResults = exports.generateProductUrlHandle = exports.DEFAULT_HEADERS = void 0;
const utils_1 = require("@/lib/utils");
const utils_2 = require("./utils");
exports.DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "3ca17c2ebda5c3b2cde891f9ed8ea40b",
    "X-Algolia-Application-Id": "HKOOLREUMF",
    Dnt: "1",
};
function generateProductUrlHandle({ objectID, name_en_gb }) {
    const merchantId = "gucci";
    const brand = "gucci";
    const shortDescription = name_en_gb === null || name_en_gb === void 0 ? void 0 : name_en_gb.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-"); // Replace multiple hyphens with a single hyphen
    return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
const getGucciSearchResults = ({ page = "1", genderSlug = "women", searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //
    const pageId = parseInt(page) - 1;
    // build search query so we can match custom attributes like category
    // (e.g. "women gucci long-sleeve t-shirt" - {gender} {merchant} {category} {query})
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
    });
    // hits per page should always be 50
    const payload = {
        // query: ,
        clickAnalytics: true,
        analytics: true,
        hitsPerPage: 50,
        page: pageId,
        // facetFilters: [
        //   ["sellableIn:fr"],
        //   ["inStock:true", "isVisibleWithoutStock:true", "isStockInStore:true"],
        //   ["categoryLevel1_en_gb:Men"],
        // ],
        // facets: [
        //   "categoryLevel1_en_gb",
        //   "categoryLevel2_en_gb",
        //   "categoryLevel3_en_gb",
        //   "combinedCategory3And4_en_gb",
        //   "material_en_gb",
        //   "lineName",
        //   "colour_en_gb",
        //   "size_en_gb",
        // ],
        // restrictSearchableAttributes: [
        //   "styleCode",
        //   "categoryLevel1_en_gb",
        //   "categoryLevel2_en_gb",
        //   "categoryLevel3_en_gb",
        //   "categoryLevel4_en_gb",
        //   "allCategories_en_gb",
        //   "name_en_gb",
        //   "lineName",
        //   "material_en_gb",
        //   "colour_en_gb",
        //   "size_en_gb",
        //   "sku",
        // ],
        attributesToRetrieve: ["*"],
        attributesToHighlight: [],
        analyticsTags: ["fr", "en_gb", "fr-en_gb"],
    };
    const response = yield fetch(`https://hkoolreumf-dsn.algolia.net/1/indexes/Europe_Catalog_UNO/query?${searchParams.toString()}`, {
        method: "POST",
        headers: exports.DEFAULT_HEADERS,
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const json = yield response.json();
        utils_1.logger.DEV_LOG_ONLY(json);
        utils_1.logger.DEV_LOG_ONLY("[EXCEPTION] search result error, response status !== ok", "[ERROR] parsing error or banned by gucci");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    const json = yield response.json();
    if (!json.hits || json.hits.length === 0) {
        utils_1.logger.DEV_LOG_ONLY(json);
        utils_1.logger.DEV_LOG_ONLY("[ERROR] no results, might be invalid payload");
        return {
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            products: [],
            categories: [],
        };
    }
    const { totalPages, totalItems, number: currentPage, } = {
        totalPages: Number(json === null || json === void 0 ? void 0 : json.nbPages),
        totalItems: Number(json === null || json === void 0 ? void 0 : json.nbHits),
        number: Number(json === null || json === void 0 ? void 0 : json.page),
    };
    const ruble_rate = yield (0, utils_1.getRubleRate)();
    // console.log(json?.hits);
    const price_converted_products = (_a = json === null || json === void 0 ? void 0 : json.hits) === null || _a === void 0 ? void 0 : _a.map((product) => ({
        id: product.objectID,
        gender: product.genders_en_gb,
        objectID: product.objectID,
        title: product.name_en_gb,
        currency: "RUB",
        category: product.allCategories_en_gb,
        brand: {
            id: "gucci",
            name: "Gucci",
            description: "Gucci",
        },
        images: [
            {
                url: product.imgUrl
                    .replace("//", "https://")
                    .replace("$format$", (0, utils_2.formatImage)(product.thumbnailUrl.split("/")[4])),
                order: 1,
                size: "1000",
            },
        ],
        slug: generateProductUrlHandle(product),
        price: product.price_eur * 1.2 * ruble_rate,
    }));
    return {
        totalItems,
        totalPages,
        currentPage,
        products: price_converted_products,
        categories: [],
    };
});
exports.getGucciSearchResults = getGucciSearchResults;
const getGucciProduct = ({ productId, }) => __awaiter(void 0, void 0, void 0, function* () {
    //   fetch product and return generalized product item <GeneralProductItem>
    //   const response = await fetch(
    //     `https://www.fendi.com/fr-en/${productId}.html`,
    //     {
    //       headers: defaultHeaders,
    //     }
    //   );
    //   return product;
    return null;
});
exports.getGucciProduct = getGucciProduct;
