"use strict";
// these methods are duplicates of what we use in production, scrapers should follow the generalized type of objects so we can just plug it in
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
exports.getSearchResults = exports.getDeliveryEstimates = exports.getProduct = void 0;
const patterns_1 = require("@/scrapers/patterns");
const utils_1 = require("@/lib/utils");
const gucci_1 = require("@/scrapers/gucci");
/*
    {productId} and {merchantId} are parsed from the url
    ----------------------------------------------------
    - we use {productId} fetched from the retailer as the key identifier on our end
    - merchantId is our internal identifier for the retailer
*/
const getProduct = ({ productId, merchantId, }) => __awaiter(void 0, void 0, void 0, function* () {
    switch (merchantId) {
        //   case 'gucci':
        //     return await getGucciProduct({ productId });
        default:
            return null;
    }
});
exports.getProduct = getProduct;
// discuss with Masha what retailers require real time delivery estimated (e.g. for instore pickup) and fallback the others
const getDeliveryEstimates = ({ product, merchantId, }) => __awaiter(void 0, void 0, void 0, function* () {
    switch (merchantId) {
        // case 'ff':
        //   const farfetchMarchantId = product.variants?.[0]?.farfetchMerchantId;
        //   return await getFarfetchDeliveryEstimates({ merchantId: farfetchMarchantId });
        default:
            return {
                error: "Invalid or {ExternalMerchantId} was not provided",
            };
    }
});
exports.getDeliveryEstimates = getDeliveryEstimates;
const getSearchResults = ({ page = "1", gender, searchValue, category, brandId, merchantId = "ff", }) => __awaiter(void 0, void 0, void 0, function* () {
    const isGucci = searchValue === null || searchValue === void 0 ? void 0 : searchValue.toLowerCase().match(patterns_1.regex.gucci);
    if (isGucci || merchantId === "gucci") {
        utils_1.logger.DEV_LOG_ONLY("matched gucci input!!", searchValue);
        const query = searchValue === null || searchValue === void 0 ? void 0 : searchValue.toLocaleLowerCase().replace(patterns_1.regex.gucci, "").trim().replace("gucci", "");
        return (0, gucci_1.getGucciSearchResults)({
            page,
            searchValue: query,
            category,
            genderSlug: gender,
        });
    }
    // logger.DEV_LOG_ONLY('fallback to Farfetch search if no params have been matched');
    // return getFarfetchSearchResults({ page, genderSlug: gender, searchValue, category, brandId });
    return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        products: [],
        categories: [],
    };
});
exports.getSearchResults = getSearchResults;
