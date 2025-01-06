import algoliasearch from "algoliasearch";

const client = algoliasearch("N8MQF53XOS", "dc3911b9cd576f3e6b58360095b1a21a");
export const brandskazka_index = client.initIndex("brandskazka_products");
export const mode_wave_index = client.initIndex("mode_wave_products");
// export const index = client.initIndex("products_raw");
