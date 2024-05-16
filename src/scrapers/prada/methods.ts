import cheerioModule from "cheerio";
import {
  AlgoliaSingleResponse,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  ProductVariant,
  SearchResultsHandler,
} from "@/types";
import {
  MiuMiuProduct,
  MiuMiuSearchResponse,
  MiuMiuSearchResponseItem,
} from "./types";
import { generateProductUrlHandle } from "./utils";
import { getRubleRate } from "@/lib/utils";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "9ae6ea7f6450bcb8343c62c96b2cbee3",
  "X-Algolia-Application-Id": "OCPT799JD8",
  Dnt: "1",
};

export const getPradaDeliveryEstimates = async ({ id }: GeneralProductItem) => {
  console.log(id);
  // const response = await fetch(
  //   `https://api.prada.com/anon/mwstorestore/byFilterStore?productId=${id}`,
  //   {
  //     headers: {
  //       ...defaultHeaders,
  //       Storeid: 'miuMiuStore-FR'
  //     }
  //   }
  // );

  // const json: any = await response.json();
  // const isExpress = json?.data?.[0]?.PhysicalStore?.length > 0;
  // console.log(response.status, json);

  const isExpress = true;

  return {
    data: {
      merchantDeliveryDate: new Date(
        Date.now() + (isExpress ? 345_600_000 : 691_000_000)
      ), // 7 days
      deliveryDate: new Date(
        Date.now() + (isExpress ? 345_600_000 : 691_000_000)
      ), // 7 days
      isExpress: Boolean(isExpress),
      isFallback: true,
    },
  };
};

export const getPradaSearchResults = async ({
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
    `https://ocpt799jd8-dsn.algolia.net/1/indexes/Prada_FR_en/query?${searchParams.toString()}`,
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
      id: "prada",
      name: "Prada",
      description: "Prada",
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
