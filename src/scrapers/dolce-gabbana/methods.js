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
exports.getDolceGabbanaSearchResults = exports.getDolceGabbanaDeliveryEstimates = exports.defaultHeaders = void 0;
const utils_1 = require("./utils");
const utils_2 = require("@/lib/utils");
exports.defaultHeaders = {
    // Authorization: `Bearer eyJ2ZXIiOiIxLjAiLCJqa3UiOiJzbGFzL3Byb2QvYmtkYl9wcmQiLCJraWQiOiJhYjg2ZTA3NC0wY2E4LTRkZGItOTA0Ny02ZjgwMjVmY2VhODciLCJ0eXAiOiJqd3QiLCJjbHYiOiJKMi4zLjQiLCJhbGciOiJFUzI1NiJ9.eyJhdXQiOiJHVUlEIiwic2NwIjoic2ZjYy5zaG9wcGVyLW15YWNjb3VudC5iYXNrZXRzIHNmY2Muc2hvcHBlci1kaXNjb3Zlcnktc2VhcmNoIHNmY2Muc2hvcHBlci1teWFjY291bnQucGF5bWVudGluc3RydW1lbnRzIHNmY2Muc2hvcHBlci1jdXN0b21lcnMubG9naW4gc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5vcmRlcnMgc2ZjYy5zaG9wcGVyLXByb2R1Y3RsaXN0cyBzZmNjLnNob3BwZXItcHJvbW90aW9ucyBzZmNjLnNob3BwZXIuc3RvcmVzIHNmY2Mub3JkZXJzLnJ3IHNmY2Muc2Vzc2lvbl9icmlkZ2Ugc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wYXltZW50aW5zdHJ1bWVudHMucncgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wcm9kdWN0bGlzdHMgc2ZjYy5zaG9wcGVyLWNhdGVnb3JpZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudCBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3NlcyBzZmNjLnNob3BwZXItcHJvZHVjdHMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5ydyBzZmNjLnNob3BwZXItY29udGV4dC5ydyBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMgc2ZjYy5zaG9wcGVyLWN1c3RvbWVycy5yZWdpc3RlciBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3Nlcy5ydyBzZmNjLnNob3BwZXItbXlhY2NvdW50LnByb2R1Y3RsaXN0cy5ydyBzZmNjLnNob3BwZXItcHJvZHVjdCBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMucncgc2ZjYy5zaG9wcGVyLWdpZnQtY2VydGlmaWNhdGVzIHNmY2Muc2hvcHBlci1wcm9kdWN0LXNlYXJjaCIsInN1YiI6ImNjLXNsYXM6OmJrZGJfcHJkOjpzY2lkOjAxYzNhMjlmLTMzNmMtNDlkNS04ZWJlLWMxMzNmZjk4Mjk0NTo6dXNpZDo5YmIxZjk0OC1mNmFmLTQ2NGUtYWQ4ZS1iYzE4MzM4YWM5MjYiLCJjdHgiOiJzbGFzIiwiaXNzIjoic2xhcy9wcm9kL2JrZGJfcHJkIiwiaXN0IjoxLCJkbnQiOiIwIiwiYXVkIjoiY29tbWVyY2VjbG91ZC9wcm9kL2JrZGJfcHJkIiwibmJmIjoxNzExNjEzODYzLCJzdHkiOiJVc2VyIiwiaXNiIjoidWlkbzpzbGFzOjp1cG46R3Vlc3Q6OnVpZG46R3Vlc3QgVXNlcjo6Z2NpZDphYm11aEdrdXczbGJFUnhIeEZ4R1lZbEhwSjo6Y2hpZDogIiwiZXhwIjoxNzExNjE1NjkzLCJpYXQiOjE3MTE2MTM4OTMsImp0aSI6IkMyQzc3NTc1MzE4MjAtMTYwMDU0NTkwNzI5NzA5MjE5MzgzNTEzNjQifQ.8jcOwzOUnmayTcjyw9OwyesJqT-jAptSosPdEqtajWe2iXRfc4dt23QTX36rrre38z9UQbc_tJexXU0BUqW7HA`,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": "77a2013e63cd5c975a959df3511b1dee",
    "X-Algolia-Application-Id": "JTHJTRLJS2",
    Dnt: "1",
};
const getDolceGabbanaDeliveryEstimates = ({ variants, }) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExpressAvailable = variants.find((x) => x.gucciAvailableForPickup);
    return {
        data: {
            merchantDeliveryDate: new Date(Date.now() + 691000000),
            deliveryDate: new Date(Date.now() + 691000000),
            isExpress: Boolean(false),
            isFallback: true,
        },
    };
});
exports.getDolceGabbanaDeliveryEstimates = getDolceGabbanaDeliveryEstimates;
const getDolceGabbanaSearchResults = ({ page = "1", searchValue = "", category, }) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const pageId = parseInt(page) - 1;
    const query = category
        ? `${category} `
        : searchValue.length > 2
            ? `${searchValue}`
            : "";
    const searchParams = new URLSearchParams({
        "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
    });
    let payload = {
        hitsPerPage: 100,
        attributesToRetrieve: ["*"],
        page: pageId,
        query,
    };
    const response = yield fetch(`https://jthjtrljs2-dsn.algolia.net/1/indexes/production_eu05_tlg_demandware_net__dolcegabbana__products__en/query?${searchParams.toString()}`, {
        method: "POST",
        headers: exports.defaultHeaders,
        body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
        const json = yield response.json();
        console.log(json);
        console.log("[EXCEPTION] search result error scrapers/dolce-gabbana/methods.ts", "[ERROR] banned by Dolce Gabbana");
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
        console.log("[EXCEPTION] search result error scrapers/dolce-gabbana/methods.ts", "[ERROR] Results not found on Docle Gabbana, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR");
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
    const getPrice = (product) => {
        try {
            const keys = Object.keys(product.price);
            for (const key of keys) {
                const price = product.price[key];
                if (price !== undefined) {
                    return price;
                }
            }
            return undefined; // Return undefined if no price is found
        }
        catch (error) {
            return undefined;
        }
    };
    const ruble_rate = yield (0, utils_2.getRubleRate)();
    // console.log(json.hits[0]);
    const price_converted_products = json === null || json === void 0 ? void 0 : json.hits.map((product) => {
        var _a, _b, _c;
        const price = (_a = getPrice(product)) === null || _a === void 0 ? void 0 : _a.listPrice;
        return {
            id: product.objectID,
            objectID: product.objectID,
            backend: "algolia",
            title: product.name.replace("DOLCE&GABBANA", "").replace("BLANCO", ""),
            currency: "RUB",
            gender: [product.searchable_categories.level_2],
            category: Object.keys(product.searchable_categories).map((key) => product.searchable_categories[key]),
            brand: {
                id: "dolcegabbana",
                name: "Dolce Gabbana",
                description: "Dolce Gabbana",
            },
            variants: ((_b = product === null || product === void 0 ? void 0 : product.all_sizes) === null || _b === void 0 ? void 0 : _b.map(({ size, pids }) => ({
                id: pids[0],
                size: size,
                price: Number(price) * 1.2 * ruble_rate,
                type: "Size",
            }))) || [],
            images: (_c = product.image_groups[0]) === null || _c === void 0 ? void 0 : _c.images.map(({ dis_base_link }, i) => ({
                url: dis_base_link,
                order: i + 1,
                size: "1000",
            })),
            slug: (0, utils_1.generateProductUrlHandleForSearchResultItem)(product),
            price: Number(price) * 1.2 * ruble_rate,
        };
    });
    return {
        totalItems,
        totalPages,
        currentPage,
        products: price_converted_products,
        categories: [],
    };
});
exports.getDolceGabbanaSearchResults = getDolceGabbanaSearchResults;
