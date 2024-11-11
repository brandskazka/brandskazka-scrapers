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
exports.getAllProducts = exports.getAllBrands = exports.generateProductUrlHandle = exports.gender = void 0;
const utils_1 = require("@/lib/utils");
const fs_1 = require("fs");
exports.gender = "Men";
const genders = [
    {
        id: "141259",
        name: "Men",
        brands: (0, fs_1.readFileSync)("./src/scrapers/farfetch/men-brands.txt", "utf8").split("\n"),
    },
    {
        id: "141258",
        name: "Women",
        brands: (0, fs_1.readFileSync)("./src/scrapers/farfetch/women-brands.txt", "utf8").split("\n"),
    },
    {
        id: "141260",
        name: "Kids",
        brands: (0, fs_1.readFileSync)("./src/scrapers/farfetch/kids-brands.txt", "utf8").split("\n"),
    },
];
const activeGender = genders.find((x) => x.name === exports.gender);
const FARFETCH_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFCMzk0QzY0Q0JCM0Y3RDIyNDY0OUVCNjQ5RkNBM0ZEM0I5NDhERTMiLCJ4NXQiOiJHemxNWk11ejk5SWtaSjYyU2Z5al9UdVVqZU0iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwOi8vZmFyZmV0Y2guY29tIiwibmJmIjoxNzE4NDE1MTQ3LCJpYXQiOjE3MTg0MTUxNDcsImV4cCI6MTczNDE4MzE0NywiYXVkIjpbImFwaSIsImNvbW1lcmNlLmJhZ3MucmVhZCIsImNvbW1lcmNlLmJhZ3Mud3JpdGUiLCJjb21tZXJjZS5jYXRhbG9nIiwiY29tbWVyY2UubWVyY2hhbnRzIiwiY29tbWVyY2UucHJvbW9ldmFsdWF0aW9ucy5yZWFkIiwiY29tbWVyY2UucHJvbW90aW9ucyIsImNvbW1lcmNlLnJldHVybnMiLCJjb21tZXJjZS5zaXplcHJlZGljdC5yZWFkIiwiY29tbWVyY2UudXNlcmJlbmVmaXRzIiwiY29tbWVyY2UudXNlcnMucHJvbW9jb2RlcyIsImNvbW1lcmNlLnZhc3Npc3RhbnQuY2hhdC5yZWFkIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LndyaXRlIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMucmVhZCIsImNvbW1zLmluYm94bXNncHJ2Lm1lc3NhZ2VzLndyaXRlIiwiZGF0YS5lc3RpbWF0ZWRkZWxpdmVyeWRhdGUiLCJleHBlcmltZW50YXRpb24uZnRvZ2dsZS5yZWFkIiwiZmFicyIsIm1rdC5jb250ZXh0dWFsbWVzc2FnZXMucmVhZCIsIm1rdC5zcGVuZGxldmVscHJvZ3JhbS5yZWFkIiwic3RvcmFnZS5maWxlYXBpLmRvd25sb2FkIiwiaHR0cDovL2ZhcmZldGNoLmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsiYXBpIiwiY29tbWVyY2UuYmFncy5yZWFkIiwiY29tbWVyY2UuYmFncy53cml0ZSIsImNvbW1lcmNlLmNhdGFsb2ciLCJjb21tZXJjZS5tZXJjaGFudHMiLCJjb21tZXJjZS5wcm9tb2V2YWx1YXRpb25zLnJlYWQiLCJjb21tZXJjZS5wcm9tb3Rpb25zIiwiY29tbWVyY2UucmV0dXJucyIsImNvbW1lcmNlLnNpemVwcmVkaWN0LnJlYWQiLCJjb21tZXJjZS51c2VyYmVuZWZpdHMiLCJjb21tZXJjZS51c2Vycy5wcm9tb2NvZGVzIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LnJlYWQiLCJjb21tZXJjZS52YXNzaXN0YW50LmNoYXQud3JpdGUiLCJjb21tcy5pbmJveG1zZ3Bydi5tZXNzYWdlcy5yZWFkIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMud3JpdGUiLCJkYXRhLmVzdGltYXRlZGRlbGl2ZXJ5ZGF0ZSIsImV4cGVyaW1lbnRhdGlvbi5mdG9nZ2xlLnJlYWQiLCJmYWJzIiwibWt0LmNvbnRleHR1YWxtZXNzYWdlcy5yZWFkIiwibWt0LnNwZW5kbGV2ZWxwcm9ncmFtLnJlYWQiLCJzdG9yYWdlLmZpbGVhcGkuZG93bmxvYWQiXSwiY2xpZW50X2lkIjoiMTlBQjgzQTM3RDgwNDcxMUFDREJDRkE2NDNGRTQzNUQiLCJjbGllbnRfdWlkIjoiMTAwMDIiLCJjbGllbnRfdGVuYW50SWQiOiIxMDAwMCIsImNsaWVudF9ndWVzdCI6IjUwMDAwMjYxNDYwNzY3NTQiLCJqdGkiOiIwOEIyQzE2NzRBQTQ5NzFCNDg5NzAyRTUwODhBRENDOCJ9.ml4aAJb9RnEZUbXbPyX6V1njjoDRZIigP32PZ93A1ahP-7b8J3rLH9k5NAqotEukucNuaNvEVMReQT_voqg3JG3xM9r-pA4r8aA6yZA04CbFvCNkY9_xeqY7cY2s-n6WOwtX1DrCqv64RFd98m2_xhxwE9XzvYmSBrDL_H_pwx93eVEOzv9O0sWCRrTLKL9EDVkw_s2wDAhSN-_958Ls7V8Mc7EmfrcENASx4wrWBRpR4rZ9JTmRKcEnmQ0WzYK_ZZ3G_Kmkso8m2sR4w_pjT6kCp2q43e2aQEcHvglEr1r1LaX8jG46rQ5BWTahVXn8Df0uCnqnTWZQSsgjNUguwtix2Eu2DX4YK8vihFVjccP5Wm-97u4PwgHnRFRfAcjEcQcab1NJEx1TLpPw1x_qRDwHups7-CNSRKJOCQfjp2pldBweuaRCe4dQEbLMu2Zk2w6QpkR2Z0yU5sKhCyGtM_iodoT7lwGKR9oJ6DePht5Gr9Mf_Tok1c1qqkieqlzV35BqUWw9OSvrUF3Er4AwdOTv3LcwfHF133sgXwJskXxfpS9V5h-yfp7U__iSSrQqEQ9gjYzwITKUA2iyz3h_s8U26w_40QbfMiqShAXqTYm5L_AumC7-csyOxN6nmmncYv2qKsdQoDVSLSRx1cZtxehRFLwNQ_5Kxtv5ljzyVfk";
let headers = {
    Authorization: `Bearer ${FARFETCH_TOKEN}`,
    "Accept-Language": "en-US",
    "FF-Country": `FR`,
    "FF-Currency": `EUR`,
};
function generateProductUrlHandle({ id, shortDescription }) {
    const name = shortDescription === null || shortDescription === void 0 ? void 0 : shortDescription.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-"); // Replace multiple hyphens with a single hyphen
    return `${name}-${id}`;
}
exports.generateProductUrlHandle = generateProductUrlHandle;
const getAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.farfetch.net/v1/brands?page=1&pageSize=10000&categoryId=${activeGender === null || activeGender === void 0 ? void 0 : activeGender.id}&priceType=0,1`, {
        method: "GET",
        headers,
    });
    const json = yield response.json();
    let designers = [];
    const designerList = json.entries;
    for (const { name, id } of designerList) {
        if (id && name) {
            if (activeGender === null || activeGender === void 0 ? void 0 : activeGender.brands.includes(name)) {
                designers.push({ name, id });
            }
        }
    }
    return designers;
});
exports.getAllBrands = getAllBrands;
const getAllProducts = (page = 1, brandId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const products = []; // Array to store all scraped products
    const ruble_rate = yield (0, utils_1.getRubleRate)();
    const response = yield fetch(`https://api.farfetch.net/v1/search/products?imagesSizes=1000&fields=currencyIsoCode,shortDescription,categories,variants,variant,id,tag,priceWithoutDiscount,images,quantity,brand,merchantId,type,price,priceType&contextFilters=priceType:0,1;categories:${activeGender === null || activeGender === void 0 ? void 0 : activeGender.id};brands:${brandId}&sort=ranking&pageSize=40&page=${page}&facets=ShippingFrom,Discount,Categories,SizesByCategory,Brands,Gender,Price,Colors,Attributes&includeExplanation=Ranking`, {
        headers,
    });
    const json = yield response.json();
    for (const product of json.products.entries) {
        const single_product_response = yield fetch(`https://api.farfetch.net/v1/products/${product.id}?fields=price,promotions,labels,promotionPercentage,priceType,id,tag,currencyIsoCode,quantity,brand,merchantId,priceWithoutDiscount,images,type,categories,shortDescription,variants&facets=Id&page=1&contextFilters=priceType:0,1&sort=requestProductsIds&pageSize=40`, {
            headers,
        });
        const single_product_json = yield single_product_response.json();
        products.push({
            id: single_product_json.id,
            objectID: single_product_json.id,
            title: single_product_json.shortDescription,
            currency: "RUB",
            gender: [exports.gender],
            backend: "farfetch",
            updatedAt: new Date().toISOString(),
            category: single_product_json.categories.map((category) => category.name),
            brand: {
                id: (_a = single_product_json.brand.name) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replaceAll("/", "-"),
                name: single_product_json.brand.name,
                description: single_product_json.brand.name,
            },
            images: (_d = (_c = (_b = single_product_json.images) === null || _b === void 0 ? void 0 : _b.images) === null || _c === void 0 ? void 0 : _c.filter((x) => x.size === "1000")) === null || _d === void 0 ? void 0 : _d.map(({ url, order }) => ({
                url,
                order,
                size: "1000",
            })),
            variants: single_product_json.variants.map((variant) => {
                var _a, _b, _c, _d;
                return ({
                    id: (_b = (_a = variant === null || variant === void 0 ? void 0 : variant.attributes) === null || _a === void 0 ? void 0 : _a.find((x) => x.type === "SizeDescription")) === null || _b === void 0 ? void 0 : _b.value,
                    type: "Size",
                    size: (_d = (_c = variant === null || variant === void 0 ? void 0 : variant.attributes) === null || _c === void 0 ? void 0 : _c.find((x) => x.type === "SizeDescription")) === null || _d === void 0 ? void 0 : _d.value,
                    price: variant.price.priceInclTaxes * 1.2 * ruble_rate,
                });
            }),
            slug: generateProductUrlHandle({
                id: single_product_json.id,
                shortDescription: single_product_json.shortDescription,
            }),
            price: ((_g = (_f = (_e = single_product_json.variants) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.price) === null || _g === void 0 ? void 0 : _g.priceInclTaxes) *
                1.2 *
                ruble_rate,
        });
    }
    const pagination = {
        currentPage: page,
        totalPages: json.products.totalPages,
        totalItems: json.products.totalItems,
    };
    //   console.log(pagination, products.length, "products length");
    return Object.assign(Object.assign({}, pagination), { products: products });
});
exports.getAllProducts = getAllProducts;
