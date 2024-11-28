import algoliasearch from "algoliasearch";

const client = algoliasearch("P80WOP9K0O", "7abb32d0f1e554cbeb81e6c8a1c3529d");
export const brandskazka_index = client.initIndex("brandskazka_products");
export const mode_wave_index = client.initIndex("mode_wave_products");
// export const index = client.initIndex("products_raw");
