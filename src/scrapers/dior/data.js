"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPayload = exports.defaultHeaders = exports.indexName = exports.domainBase = exports.appId = exports.apiKey = exports.merchantId = exports.siteName = void 0;
exports.siteName = "dior";
exports.merchantId = "dior";
exports.apiKey = "64e489d5d73ec5bbc8ef0d7713096fba";
exports.appId = "KPGNQ6FJI9";
exports.domainBase = "kpgnq6fji9";
exports.indexName = "dev_product_fr_fr";
exports.defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "X-Algolia-Api-Key": exports.apiKey,
    "X-Algolia-Application-Id": exports.appId,
};
exports.defaultPayload = {
    hitsPerPage: 50,
    // facetFilters: [] as any[],
    // attributesToRetrieve: ["*"],
    // highlightPreTag: "<ais-highlight-0000000000>",
    // highlightPostTag: "</ais-highlight-0000000000>",
    // distinct: true,
    // clickAnalytics: true,
};
