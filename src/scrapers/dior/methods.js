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
exports.getDiorProduct = exports.getDiorSearchResults = exports.getDiorDeliveryEstimates = void 0;
const utils_1 = require("@/lib/utils");
const utils_2 = require("./utils");
const data_1 = require("./data");
const getDiorDeliveryEstimates = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const response = yield fetch("https://api-fashion.dior.com/graph?GetBoutiqueStocks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Dior-Locale": "fr_fr",
            "X-Dior-Universe": "couture",
        },
        body: JSON.stringify({
            operationName: "GetBoutiqueStocks",
            variables: { id: id },
            query: "fragment Boutique on StoreAvailability {\n  boutique {\n    name\n    id\n    boutiqueId\n    isEReservationStore\n    apiKeyBooxi\n    services {\n      id\n      key\n      text\n      __typename\n    }\n    address {\n      street\n      street2\n      zipcode\n      city\n      region\n      ward\n      countryCode\n      __typename\n    }\n    openingTimes {\n      day\n      hours {\n        from\n        to\n        __typename\n      }\n      __typename\n    }\n    phone {\n      phoneNumber\n      phoneNumberPrefix\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetBoutiqueStocks($id: String!) {\n  product: getProduct(id: $id) {\n    title\n    subtitle\n    sku\n    code\n    eReservation\n    price {\n      value\n      currency\n      __typename\n    }\n    medias {\n      image {\n        mobile {\n          uri\n          alt\n          width\n          height\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    variations {\n      sku\n      title\n      price {\n        value\n        currency\n        __typename\n      }\n      boutiqueStocks {\n        status\n        ...Boutique\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
        }),
    });
    const json = yield response.json();
    const isExpress = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json.data) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.variations) === null || _c === void 0 ? void 0 : _c.find((x) => { var _a; return ((_a = x === null || x === void 0 ? void 0 : x.boutiqueStocks) === null || _a === void 0 ? void 0 : _a.length) > 0; });
    return {
        data: {
            merchantDeliveryDate: new Date(Date.now() + (isExpress ? 345600000 : 691000000)),
            deliveryDate: new Date(Date.now() + (isExpress ? 345600000 : 691000000)),
            isExpress: Boolean(isExpress),
            isFallback: true,
        },
    };
});
exports.getDiorDeliveryEstimates = getDiorDeliveryEstimates;
const getDiorSearchResults = ({ page = "1", genderSlug = "women", searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = searchValue.toLowerCase().replace("dior", "");
    const pageId = parseInt(page) - 1;
    const query = "";
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
    });
    let payload = {
        page: pageId,
        query: "homme",
        hitsPerPage: 8,
        facets: ["universe"],
        filters: "universe:couture",
        clickAnalytics: true,
    };
    // if (genderSlug === "men") {
    //   payload.facetFilters = [["category_lvl0:Homme"]];
    // }
    // if (genderSlug === "women") {
    //   payload.facetFilters = [["category_lvl0:Femme"]];
    // }
    const response = yield fetch(`https://${data_1.domainBase}-dsn.algolia.net/1/indexes/${data_1.indexName}/query?${searchParams.toString()}`, {
        method: "POST",
        headers: data_1.defaultHeaders,
        body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
        const json = yield response.json();
        console.log(json);
        console.log(`[EXCEPTION] search result error scrapers/${data_1.siteName}/methods.ts`, `[ERROR] banned by ${data_1.siteName}`);
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
        console.log(json);
        console.log(`[EXCEPTION] search result error scrapers/${data_1.siteName}/methods.ts`, `[ERROR] Results not found on ${data_1.siteName}, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR`);
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
    console.log(json.nbHits);
    const price_converted_products = json === null || json === void 0 ? void 0 : json.hits.map((product) => {
        var _a, _b, _c, _d;
        return ({
            id: product.objectID,
            objectID: product.objectID,
            title: product.title_int,
            currency: "RUB",
            gender: [product.category_int_lvl0],
            category: product.categories_int,
            brand: {
                id: data_1.siteName,
                name: (0, utils_1.capitalizeFirstLetter)(data_1.siteName),
                description: (0, utils_1.capitalizeFirstLetter)(data_1.siteName),
            },
            images: ((_c = (_b = (_a = product === null || product === void 0 ? void 0 : product.assets) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.gh)
                ? product.assets.images.product.gh.map(({ uri }, i) => ({
                    url: `https://www.dior.com${uri}`,
                    order: i + 1,
                    size: "1000",
                }))
                : [],
            slug: (0, utils_2.generateProductUrlHandle)(product),
            price: Number((_d = product.variants[0]) === null || _d === void 0 ? void 0 : _d.price.amount) * 1.2 * ruble_rate,
            variants: product.variants.map(({ size, price, sku, sizeFormatted }) => ({
                id: sku,
                size: sizeFormatted,
                type: "Size",
                price: price.amount * 1.2 * ruble_rate,
            })),
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
exports.getDiorSearchResults = getDiorSearchResults;
const getDiorProduct = ({ productId, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`getting ${data_1.siteName} prod`);
    const response = yield fetch(`https://${data_1.domainBase}-dsn.algolia.net/1/indexes/${data_1.indexName}/${productId}`, {
        method: "GET",
        headers: data_1.defaultHeaders,
    });
    const data = yield response.json();
    const rublesRate = yield (0, utils_1.getRubleRate)();
    if (response.status !== 200) {
        console.log("response status is bad in getProduct");
        return null;
    }
    const productVariants = data.variants.map(({ size, price, sku, sizeFormatted }) => ({
        id: sku,
        size: sizeFormatted,
        type: "Size",
        price: price.amount * 1.2 * rublesRate,
    }));
    const images = data.assets.images.product.gh.map(({ uri }, i) => ({
        url: `https://www.dior.com${uri}`,
        order: i + 1,
        size: "1000",
    }));
    const slug = (0, utils_2.generateProductUrlHandle)(data);
    const product = {
        id: productId,
        slug,
        title: data.subtitle_int,
        brand: {
            id: data_1.siteName,
            name: (0, utils_1.capitalizeFirstLetter)(data_1.siteName),
            description: (0, utils_1.capitalizeFirstLetter)(data_1.siteName),
        },
        styleId: ``,
        merchantId: data_1.merchantId,
        madeIn: "Italy",
        categories: [],
        description: data.subtitle_int,
        images,
        variants: productVariants,
    };
    return product;
});
exports.getDiorProduct = getDiorProduct;
