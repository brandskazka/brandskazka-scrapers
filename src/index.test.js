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
const index_1 = require("./index");
describe("getProduct function", () => {
    it("should return null if the merchantId is not supported", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.getProduct)({ productId: "123", merchantId: "..." });
        expect(result).toBeNull();
    }));
});
//   describe('getDeliveryEstimates function', () => {
//     it('should return an error if an invalid merchantId is provided', async () => {
//       const result = await getDeliveryEstimates({ product: {}, merchantId: 'invalid' });
//       expect(result).toEqual({ error: 'Invalid or {ExternalMerchantId} was not provided' });
//     });
//   });
describe("getSearchResults function", () => {
    it("should return search results for Gucci if the search value matches", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.getSearchResults)({
            searchValue: "Gucci shoes",
            merchantId: "gucci",
        });
        expect(Array.isArray(result.products)).toBe(true);
        expect(result.products.length).toBeGreaterThan(0);
    }));
    it("should return empty search results if the search value does not match Gucci", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.getSearchResults)({
            searchValue: "Nike shoes",
            merchantId: "gucci",
        });
        expect(Array.isArray(result.products)).toBe(true);
        expect(result.products.length).toHaveLength(0);
    }));
    it("should return empty search results if the merchantId is not Gucci", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.getSearchResults)({
            searchValue: "Gucci shoes",
            merchantId: "ff",
        });
        expect(Array.isArray(result.products)).toBe(true);
        expect(result.products.length).toHaveLength(0);
    }));
});
