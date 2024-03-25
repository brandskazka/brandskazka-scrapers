import { getProduct, getDeliveryEstimates, getSearchResults } from "./index";

describe("getProduct function", () => {
  it("should return null if the merchantId is not supported", async () => {
    const result = await getProduct({ productId: "123", merchantId: "..." });
    expect(result).toBeNull();
  });
});

//   describe('getDeliveryEstimates function', () => {
//     it('should return an error if an invalid merchantId is provided', async () => {
//       const result = await getDeliveryEstimates({ product: {}, merchantId: 'invalid' });
//       expect(result).toEqual({ error: 'Invalid or {ExternalMerchantId} was not provided' });
//     });

//   });

describe("getSearchResults function", () => {
  it("should return search results for Gucci if the search value matches", async () => {
    const result = await getSearchResults({
      searchValue: "Gucci shoes",
      merchantId: "gucci",
    });
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products.length).toBeGreaterThan(0);
  });

  it("should return empty search results if the search value does not match Gucci", async () => {
    const result = await getSearchResults({
      searchValue: "Nike shoes",
      merchantId: "gucci",
    });
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products.length).toHaveLength(0);
  });

  it("should return empty search results if the merchantId is not Gucci", async () => {
    const result = await getSearchResults({
      searchValue: "Gucci shoes",
      merchantId: "ff",
    });
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products.length).toHaveLength(0);
  });
});
