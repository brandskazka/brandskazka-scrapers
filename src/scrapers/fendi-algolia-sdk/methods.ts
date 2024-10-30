import { GeneralSearchResultProductItem, SearchResultsHandler } from "@/types";
import { generateProductUrlHandle } from "./utils";
import { getRubleRate } from "@/lib/utils";

import algoliasearch from "algoliasearch";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "2432d2d29d010990eb08b1f31dcdebaf",
  "X-Algolia-Application-Id": "7VXQ9SKMZW",
  Dnt: "1",
};

export const getFendiSearchResults = async ({
  page = "1",
}: {
  page?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  //
  const pageId = parseInt(page) - 1;
  const client = algoliasearch(
    defaultHeaders["X-Algolia-Application-Id"],
    defaultHeaders["X-Algolia-Api-Key"]
  );

  const index = client.initIndex(
    "production_eu01_fendi_demandware_net__FR__products__en_FR"
  );

  const result = await index.search<any>("", {
    attributesToRetrieve: ["*"],
    hitsPerPage: 50,
    page: pageId,
  });

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
  // console.log(result.hits[0]);

  const price_converted_products: GeneralSearchResultProductItem[] =
    result?.hits.map((product) => ({
      id: product.objectID,
      objectID: product.objectID,
      title: product.name,
      backend: "algolia",
      currency: "RUB",
      gender: [product.__primary_category?.["0"]],
      category: product.categories[0].map((x: any) => x.name),
      brand: {
        id: "fendi",
        name: "Fendi",
        description: "Fendi",
      },
      images: product.image_groups[0]?.images.map(
        ({ dis_base_link }: any, i: number) => ({
          url: dis_base_link,
          order: i + 1,
          size: "1000",
        })
      ),
      slug: generateProductUrlHandle(product),
      price: product.price.EUR * 1.2 * ruble_rate,
    }));

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};
