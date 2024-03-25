import type {
  AlgoliaSingleResponse,
  ExternalMerchantId,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  NotRequired,
  SearchResultsHandler,
} from "@/types";
import type { GucciItem } from "./types";

import { getRubleRate, logger } from "@/lib/utils";

export const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "3ca17c2ebda5c3b2cde891f9ed8ea40b",
  "X-Algolia-Application-Id": "HKOOLREUMF",
  Dnt: "1",
};

export function generateProductUrlHandle({ objectID, name_en_gb }: GucciItem) {
  const merchantId: ExternalMerchantId = "gucci";
  const brand = "gucci";

  const shortDescription = name_en_gb
    .toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}

export const getGucciSearchResults = async ({
  page = "1",
  genderSlug = "women",
  searchValue = "",
  category,
}: {
  page?: string;
  genderSlug?: Gender;
  searchValue?: string;
  category?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  //
  const pageId = parseInt(page) - 1;
  const query =
    genderSlug +
    (category
      ? ` ${category}`
      : searchValue.length > 2
      ? ` ${searchValue}`
      : "");

  const searchParams = new URLSearchParams({
    "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
  });

  const payload = {
    query,
    clickAnalytics: true,
    analytics: true,
    hitsPerPage: 50,
    page: pageId,
    facetFilters: [
      ["sellableIn:fr"],
      ["inStock:true", "isVisibleWithoutStock:true", "isStockInStore:true"],
      ["categoryLevel1_en_gb:Men"],
    ],
    facets: [
      "categoryLevel1_en_gb",
      "categoryLevel2_en_gb",
      "categoryLevel3_en_gb",
      "combinedCategory3And4_en_gb",
      "material_en_gb",
      "lineName",
      "colour_en_gb",
      "size_en_gb",
    ],
    restrictSearchableAttributes: [
      "styleCode",
      "categoryLevel1_en_gb",
      "categoryLevel2_en_gb",
      "categoryLevel3_en_gb",
      "categoryLevel4_en_gb",
      "allCategories_en_gb",
      "name_en_gb",
      "lineName",
      "material_en_gb",
      "colour_en_gb",
      "size_en_gb",
      "sku",
    ],
    attributesToRetrieve: [
      "name_en_gb",
      "imgUrl",
      "altImgUrl",
      "price_eur",
      "pdpUrl",
      "categoryLevel1_en_gb",
      "categoryLevel2_en_gb",
      "categoryLevel3_en_gb",
      "categoryLevel4_en_gb",
    ],
    attributesToHighlight: [],
    analyticsTags: ["fr", "en_gb", "fr-en_gb"],
  };

  const response = await fetch(
    `https://hkoolreumf-dsn.algolia.net/1/indexes/Europe_Catalog_UNO/query?${searchParams.toString()}`,
    {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(payload),
    }
  );

  if (response.ok) {
    const json = await response.json();
    logger.DEV_LOG_ONLY(json);
    logger.DEV_LOG_ONLY(
      "[EXCEPTION] search result error, response status !== ok",
      "[ERROR] parsing error or banned by gucci"
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const json: AlgoliaSingleResponse<GucciItem> = await response.json();
  //   const { nbHits, nbPages, hits} = json

  if (!json.hits || json.hits.length === 0) {
    logger.DEV_LOG_ONLY(json);
    logger.DEV_LOG_ONLY("[ERROR] no results, might be invalid payload");
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const {
    totalPages,
    totalItems,
    number: currentPage,
  } = {
    totalPages: Number(json?.nbPages),
    totalItems: Number(json?.nbHits),
    number: Number(json?.page),
  };

  const ruble_rate = await getRubleRate();

  const price_converted_products = json?.hits.map((product) => ({
    id: product.id,
    title: product.name_en_gb,
    currency: product.price_eur,
    brand: {
      id: "gucci",
      name: "Gucci",
      description: "Gucci",
    },
    images: [
      {
        url: product.imgUrl.replace("//", "https://"),
        order: 1,
        size: "1000",
      },
    ],
    slug: generateProductUrlHandle(product),
    price: product.price_eur * 1.2 * ruble_rate,
  }));

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products,
    categories: [],
  };
};

export const getGucciProduct = async ({
  productId,
}: {
  productId: string;
}): Promise<NotRequired<GeneralProductItem>> => {
  //   fetch product and return generalized product item <GeneralProductItem>

  //   const response = await fetch(
  //     `https://www.fendi.com/fr-en/${productId}.html`,
  //     {
  //       headers: defaultHeaders,
  //     }
  //   );

  //   return product;
  return null;
};
