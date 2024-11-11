import algoliasearch from "algoliasearch";

const client = algoliasearch("P80WOP9K0O", "7abb32d0f1e554cbeb81e6c8a1c3529d");
export const index = client.initIndex("products");
// export const index = client.initIndex("products_raw");
