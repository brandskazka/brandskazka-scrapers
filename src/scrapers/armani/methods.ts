import cheerioModule from "cheerio";
import {
  AlgoliaSingleResponse,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  SearchResultsHandler,
} from "@/types";
import { SearchResultItem } from "./types";
import { generateProductUrlHandle } from "./utils";
import { getRubleRate } from "@/lib/utils";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "b0df34652f902a1081829a52886c62f0",
  "X-Algolia-Application-Id": "4TMW581MNH",
  Dnt: "1",
};

export const getArmaniSearchResults = async ({
  page = "1",
  genderSlug,
  searchValue = "",
  category,
}: {
  page?: string;
  genderSlug?: Gender;
  searchValue?: string;
  category?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  const pageId = parseInt(page) - 1;

  const searchParams = new URLSearchParams({
    "x-algolia-agent":
      "Algolia for JavaScript (4.20.0); Browser; instantsearch.js (4.57.0); Vue (3.2.31); Vue InstantSearch (4.10.12); JS Helper (3.14.2)",
  });

  const query = ``;

  const payload = {
    query,
    page: pageId,
    hitsPerPage: 100,
    attributesToRetrieve: ["*"],
  };

  const response = await fetch(
    `https://4tmw581mnh-dsn.algolia.net/1/indexes/ynap_en_fr/query?${searchParams.toString()}`,
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    }
  );

  const result: AlgoliaSingleResponse<any> = await response.json();

  if (response.status !== 200) {
    console.log(result);
    console.log(
      "[EXCEPTION] search result error scrapers/armani/methods.ts",
      "[ERROR] banned by armani",
      "[ERROR] banned by armani"
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  if (!result.hits || result.hits.length === 0) {
    console.log(result);
    console.log(
      "[EXCEPTION] search result error scrapers/armani/methods.ts",
      "[ERROR] Results not found on Loro Piana, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR"
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

  console.log(result.hits[0]._highlightResult);
  const price_converted_products: GeneralSearchResultProductItem[] =
    result?.hits.map((product) => ({
      id: product.objectID,
      objectID: product.objectID,
      title: product?.nameEN || product?._highlightResult?.name?.value || "",
      currency: "RUB",
      gender: [product._highlightResult.Gender[0].value],
      category: [
        product._highlightResult.productType.value,
        product._highlightResult.subType.value,
      ],
      brand: {
        id: "armani",
        name: "Armani",
        description: "Armani",
      },
      images: [
        {
          url: product.image.replace("//", ""),
          order: 1,
          size: "1000",
        },
      ],
      slug: generateProductUrlHandle(product),
      price: product.price * 1.2 * ruble_rate,
    }));

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};
