import algoliasearch from "algoliasearch";

const client = algoliasearch("X7GV44J6X3", "832b8a3a4065cbc66de4d627af4b52dc");
export const index = client.initIndex("products");
// export const index = client.initIndex("products_raw");
