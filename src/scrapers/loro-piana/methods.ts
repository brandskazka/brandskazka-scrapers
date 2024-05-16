import { capitalizeFirstLetter, getRubleRate } from "@/lib/utils";
import type { FarfetchImage, Gender } from "@/types";
import {
  AlgoliaSingleResponse,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  ProductVariant,
  SearchResultsHandler,
} from "@/types";
import { ProductItem, SearchResultItem } from "./types";
import { generateProductUrlHandle } from "./utils";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "003d95baf1320c35a529f975ec5b7d33",
  "X-Algolia-Application-Id": "L4PM4BBNFK",
  Dnt: "1",
};

export const getLoroPianaSearchResults = async ({
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

  const query = "";
  // genderSlug + (category ? ` ${category}` : searchValue.length > 2 ? ` ${searchValue}` : '');

  const payload = {
    query,
    attributesToRetrieve: ["*"],
    // facetFilters: ["isValid:true", "showDigitalWorldOnly:false"],
    // facets: [
    //   "categoryPathName.en",
    //   "categoryPathName.it",
    //   "categoryPathName.fr",
    //   "categoryPathName.de",
    //   "categoryPathName.ru",
    //   "categoryPathName.ja",
    //   "categoryPathName.zh",
    //   "categoryPathName.ko",
    //   "categoryPathName.ar",
    //   "categoryPathName.en_us",
    // ],
    // clickAnalytics: true,
    // analytics: true,
    hitsPerPage: 50,
    page: pageId,
  };

  const response = await fetch(
    `https://l4pm4bbnfk-dsn.algolia.net/1/indexes/prod_loropianaEU_ONLINE_FR/query?${searchParams.toString()}`,
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    }
  );

  const result: AlgoliaSingleResponse<SearchResultItem> = await response.json();

  if (response.status !== 200) {
    console.log(result);
    console.log(
      "[EXCEPTION] search result error scrapers/loro-piana/methods.ts",
      "[ERROR] banned by Loro Piana",
      "[ERROR] banned by Loro Piana"
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
      "[EXCEPTION] search result error scrapers/loro-piana/methods.ts",
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

  console.log(result?.hits);
  const price_converted_products: any[] = result?.hits.map((product) =>
    product?.name?.en?.length > 0
      ? {
          id: product.objectID,
          objectID: product.objectID,
          title: product.name.en[0],
          currency: "RUB",
          brand: {
            id: "loropiana",
            name: "Loro Piana",
            description: "Loro Piana",
          },
          variants:
            product?.size?.map((size) => ({
              id: size,
              size: size,
              price: Number(product.priceValue) * 1.2 * ruble_rate,
              type: "Size",
            })) || [],
          gender: [
            capitalizeFirstLetter(product.genderNameEn)
              .replace("Man", "Men")
              .replace("Woman", "Women"),
          ],
          category: product.categoryName.en,
          images: (() => {
            const images: FarfetchImage[] = new Array();
            if (product.imgfrontsmall) {
              images.push({
                url: product.imgfrontsmall,
                order: 1,
                size: "1000",
              });
            }
            if (product.imgbacksmall) {
              images.push({
                url: product.imgbacksmall,
                order: 2,
                size: "1000",
              });
            }
            return images;
          })(),
          slug: generateProductUrlHandle(product),
          price: product.priceValue * 1.2 * ruble_rate,
        }
      : undefined
  );

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};

export const getLoroPianaProduct = async ({
  productId: queryProductId,
}: {
  productId: string;
}): Promise<GeneralProductItem | null> => {
  const [productId, price] = decodeURIComponent(queryProductId).split(":");

  const response = await fetch(
    `https://fr.loropiana.com/en/api/pdp/product-variants?articleCode=${productId}`,
    {
      headers: defaultHeaders,
    }
  );

  if (response.status !== 200) {
    return null;
  }

  const rubles_rate = await getRubleRate();
  const results: ProductItem[] = await response.json();
  const result = results?.[0];

  if (!result) {
    console.log("scraper/loro-piana/methods :: product not found");
    return null;
  }

  const product_variants: ProductVariant[] = result.sizes.map(
    ({ code, variantCode }) => {
      return {
        id: variantCode,
        size: code,
        price: Number(price) * 1.2 * rubles_rate,
        type: "Size",
      };
    }
  );

  const product: GeneralProductItem = {
    id: productId as string,
    slug: `loro-piana-product-loropiana-${productId}`,
    title: result.productName,
    brand: {
      id: "loropiana",
      name: "Loro Piana",
      description: "Loro Piana",
    },
    styleId: ``,
    merchantId: "loropiana",
    madeIn: result.originCountry,
    categories: [],
    description: result.description,
    images: result.imagesContainers
      .map(({ formats }, i) => {
        const image = formats.find(({ format }) => format === "MEDIUM");
        return {
          url: image?.url as string,
          size: "1000",
          order: i + 1,
        };
      })
      .slice(0, 5), // or 2048
    variants: product_variants,
  };

  return product;
};
