import algoliasearch from "algoliasearch";

const client = algoliasearch("7VXQ9SKMZW", "2432d2d29d010990eb08b1f31dcdebaf");
export const index = client.initIndex("products");
// export const index = client.initIndex("products_raw");
