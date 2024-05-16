import { capitalizeFirstLetter, getRubleRate } from "@/lib/utils";
import type { Gender } from "@/types";
import {
  AlgoliaSingleResponse,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  SearchResultsHandler,
} from "@/types";
import { DeliveryEstimateResponse, SearchResultItem } from "./types";
import { generateProductUrlHandle } from "./utils";

import {
  defaultHeaders,
  defaultPayload,
  domainBase,
  indexName,
  merchantId,
  siteName,
} from "./data";

export const getDiorDeliveryEstimates = async ({ id }: GeneralProductItem) => {
  const response = await fetch(
    "https://api-fashion.dior.com/graph?GetBoutiqueStocks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Dior-Locale": "fr_fr",
        "X-Dior-Universe": "couture",
      },
      body: JSON.stringify({
        operationName: "GetBoutiqueStocks",
        variables: { id: id },
        query:
          "fragment Boutique on StoreAvailability {\n  boutique {\n    name\n    id\n    boutiqueId\n    isEReservationStore\n    apiKeyBooxi\n    services {\n      id\n      key\n      text\n      __typename\n    }\n    address {\n      street\n      street2\n      zipcode\n      city\n      region\n      ward\n      countryCode\n      __typename\n    }\n    openingTimes {\n      day\n      hours {\n        from\n        to\n        __typename\n      }\n      __typename\n    }\n    phone {\n      phoneNumber\n      phoneNumberPrefix\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetBoutiqueStocks($id: String!) {\n  product: getProduct(id: $id) {\n    title\n    subtitle\n    sku\n    code\n    eReservation\n    price {\n      value\n      currency\n      __typename\n    }\n    medias {\n      image {\n        mobile {\n          uri\n          alt\n          width\n          height\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    variations {\n      sku\n      title\n      price {\n        value\n        currency\n        __typename\n      }\n      boutiqueStocks {\n        status\n        ...Boutique\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
      }),
    }
  );

  const json: DeliveryEstimateResponse = await response.json();
  const isExpress = json?.data?.product?.variations?.find(
    (x) => x?.boutiqueStocks?.length > 0
  );

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

export const getDiorSearchResults = async ({
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
  const searchQuery = searchValue.toLowerCase().replace("dior", "");

  const pageId = parseInt(page) - 1;
  const query = "";

  const searchParams = new URLSearchParams({
    "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
  });

  let payload = {
    page: pageId,
    query: "homme",
    hitsPerPage: 8,
    facets: ["universe"],
    filters: "universe:couture",
    clickAnalytics: true,
  };

  // if (genderSlug === "men") {
  //   payload.facetFilters = [["category_lvl0:Homme"]];
  // }
  // if (genderSlug === "women") {
  //   payload.facetFilters = [["category_lvl0:Femme"]];
  // }

  const response = await fetch(
    `https://${domainBase}-dsn.algolia.net/1/indexes/${indexName}/query?${searchParams.toString()}`,
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    }
  );

  if (response.status !== 200) {
    const json = await response.json();
    console.log(json);
    console.log(
      `[EXCEPTION] search result error scrapers/${siteName}/methods.ts`,
      `[ERROR] banned by ${siteName}`
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const json: AlgoliaSingleResponse<SearchResultItem> = await response.json();

  if (!json.hits || json.hits.length === 0) {
    console.log(json);
    console.log(
      `[EXCEPTION] search result error scrapers/${siteName}/methods.ts`,
      `[ERROR] Results not found on ${siteName}, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR`
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
    totalPages: Number(json?.nbPages),
    totalItems: Number(json?.nbHits),
    number: Number(json?.page),
  };

  const ruble_rate = await getRubleRate();

  console.log(json.nbHits);

  const price_converted_products: any[] = json?.hits.map((product) => ({
    id: product.objectID,
    objectID: product.objectID,
    title: product.title_int,
    currency: "RUB",
    gender: [product.category_int_lvl0],
    category: product.categories_int,
    brand: {
      id: siteName,
      name: capitalizeFirstLetter(siteName),
      description: capitalizeFirstLetter(siteName),
    },
    images: product?.assets?.images?.product?.gh
      ? product.assets.images.product.gh.map(({ uri }, i) => ({
          url: `https://www.dior.com${uri}`,
          order: i + 1,
          size: "1000",
        }))
      : [],
    slug: generateProductUrlHandle(product),
    price: Number(product.variants[0]?.price.amount) * 1.2 * ruble_rate,
    variants: product.variants.map(({ size, price, sku, sizeFormatted }) => ({
      id: sku,
      size: sizeFormatted,
      type: "Size" as any,
      price: price.amount * 1.2 * ruble_rate,
    })),
  }));

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};

export const getDiorProduct = async ({
  productId,
}: {
  productId: string | number;
}): Promise<GeneralProductItem | null> => {
  console.log(`getting ${siteName} prod`);

  const response = await fetch(
    `https://${domainBase}-dsn.algolia.net/1/indexes/${indexName}/${productId}`,
    {
      method: "GET",
      headers: defaultHeaders,
    }
  );

  const data: SearchResultItem = await response.json();
  const rublesRate = await getRubleRate();

  if (response.status !== 200) {
    console.log("response status is bad in getProduct");
    return null;
  }

  const productVariants = data.variants.map(
    ({ size, price, sku, sizeFormatted }) => ({
      id: sku,
      size: sizeFormatted,
      type: "Size" as any,
      price: price.amount * 1.2 * rublesRate,
    })
  );

  const images = data.assets.images.product.gh.map(({ uri }, i) => ({
    url: `https://www.dior.com${uri}`,
    order: i + 1,
    size: "1000",
  }));

  const slug = generateProductUrlHandle(data);

  const product: GeneralProductItem = {
    id: productId,
    slug,
    title: data.subtitle_int,
    brand: {
      id: siteName,
      name: capitalizeFirstLetter(siteName),
      description: capitalizeFirstLetter(siteName),
    },
    styleId: ``,
    merchantId,
    madeIn: "Italy",
    categories: [],
    description: data.subtitle_int,
    images, // or 2048
    variants: productVariants,
  };

  return product;
};
