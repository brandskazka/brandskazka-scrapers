import {
  AlgoliaSingleResponse,
  Gender,
  GeneralSearchResultProductItem,
  SearchResultsHandler,
} from "@/types";
import { generateProductUrlHandle } from "./utils";
import { getRubleRate } from "@/lib/utils";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "92f9dd4fe0c2a034ed197e90a9a733bb",
  "X-Algolia-Application-Id": "2NYR2Y6A02",
  Dnt: "1",
};

export const getMiuMiuSearchResults = async ({
  page = "1",
}: {
  page?: string;
  genderSlug?: Gender;
  searchValue?: string;
  category?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  const query = ``;
  const pageId = parseInt(page) - 1;

  const searchParams = new URLSearchParams({
    "x-algolia-agent":
      "Algolia for JavaScript (4.20.0); Browser; instantsearch.js (4.57.0); Vue (3.2.31); Vue InstantSearch (4.10.12); JS Helper (3.14.2)",
  });

  const payload = {
    query,
    attributesToRetrieve: ["*"],
    hitsPerPage: 50,
    page: pageId,
  };

  const response = await fetch(
    `https://2nyr2y6a02-dsn.algolia.net/1/indexes/MiuMiu_FR_en/query?${searchParams.toString()}`,
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    }
  );

  if (response.status !== 200) {
    console.log(
      "[EXCEPTION] search result error scrapers/prada/methods.ts",
      "[ERROR] banned by Prada",
      "[ERROR] banned by Prada"
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const result: AlgoliaSingleResponse<any> = await response.json();

  if (!result.hits || result.hits.length === 0) {
    console.log(result);
    console.log(
      "[EXCEPTION] search result error scrapers/prada/methods.ts",
      "[ERROR] Results not found on Prada, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR"
    );
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
    totalPages: Number(result?.nbPages),
    totalItems: Number(result?.nbHits),
    number: Number(result?.page),
  };

  const ruble_rate = await getRubleRate();

  const price_converted_products: any[] = result?.hits.map((product) => ({
    id: product.objectID,
    objectID: product.objectID,
    title: product.Title,
    currency: "RUB",
    gender: product.Gender,
    category: Object.keys(product.ALGcategories).map(
      (key) => product.ALGcategories[key][0]
    ),
    brand: {
      id: "miumiu",
      name: "MiuMiu",
      description: "MiuMiu",
    },
    images:
      product?.Images?.map(({ link }: any, i: number) => ({
        url: link,
        order: i + 1,
        size: "1000",
      })) || [],
    slug: generateProductUrlHandle(product),
    price: product.Price.value * 1.2 * ruble_rate,
  }));

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};
