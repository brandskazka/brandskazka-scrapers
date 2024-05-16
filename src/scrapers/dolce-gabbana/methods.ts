import {
  AlgoliaSingleResponse,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  ProductVariant,
  SearchResultsHandler,
} from "@/types";
import { ListPrice, SearchResultItem, SingleItem } from "./types";
import { generateProductUrlHandleForSearchResultItem } from "./utils";
import { getRubleRate } from "@/lib/utils";

export const defaultHeaders = {
  // Authorization: `Bearer eyJ2ZXIiOiIxLjAiLCJqa3UiOiJzbGFzL3Byb2QvYmtkYl9wcmQiLCJraWQiOiJhYjg2ZTA3NC0wY2E4LTRkZGItOTA0Ny02ZjgwMjVmY2VhODciLCJ0eXAiOiJqd3QiLCJjbHYiOiJKMi4zLjQiLCJhbGciOiJFUzI1NiJ9.eyJhdXQiOiJHVUlEIiwic2NwIjoic2ZjYy5zaG9wcGVyLW15YWNjb3VudC5iYXNrZXRzIHNmY2Muc2hvcHBlci1kaXNjb3Zlcnktc2VhcmNoIHNmY2Muc2hvcHBlci1teWFjY291bnQucGF5bWVudGluc3RydW1lbnRzIHNmY2Muc2hvcHBlci1jdXN0b21lcnMubG9naW4gc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5vcmRlcnMgc2ZjYy5zaG9wcGVyLXByb2R1Y3RsaXN0cyBzZmNjLnNob3BwZXItcHJvbW90aW9ucyBzZmNjLnNob3BwZXIuc3RvcmVzIHNmY2Mub3JkZXJzLnJ3IHNmY2Muc2Vzc2lvbl9icmlkZ2Ugc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wYXltZW50aW5zdHJ1bWVudHMucncgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wcm9kdWN0bGlzdHMgc2ZjYy5zaG9wcGVyLWNhdGVnb3JpZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudCBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3NlcyBzZmNjLnNob3BwZXItcHJvZHVjdHMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5ydyBzZmNjLnNob3BwZXItY29udGV4dC5ydyBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMgc2ZjYy5zaG9wcGVyLWN1c3RvbWVycy5yZWdpc3RlciBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3Nlcy5ydyBzZmNjLnNob3BwZXItbXlhY2NvdW50LnByb2R1Y3RsaXN0cy5ydyBzZmNjLnNob3BwZXItcHJvZHVjdCBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMucncgc2ZjYy5zaG9wcGVyLWdpZnQtY2VydGlmaWNhdGVzIHNmY2Muc2hvcHBlci1wcm9kdWN0LXNlYXJjaCIsInN1YiI6ImNjLXNsYXM6OmJrZGJfcHJkOjpzY2lkOjAxYzNhMjlmLTMzNmMtNDlkNS04ZWJlLWMxMzNmZjk4Mjk0NTo6dXNpZDo5YmIxZjk0OC1mNmFmLTQ2NGUtYWQ4ZS1iYzE4MzM4YWM5MjYiLCJjdHgiOiJzbGFzIiwiaXNzIjoic2xhcy9wcm9kL2JrZGJfcHJkIiwiaXN0IjoxLCJkbnQiOiIwIiwiYXVkIjoiY29tbWVyY2VjbG91ZC9wcm9kL2JrZGJfcHJkIiwibmJmIjoxNzExNjEzODYzLCJzdHkiOiJVc2VyIiwiaXNiIjoidWlkbzpzbGFzOjp1cG46R3Vlc3Q6OnVpZG46R3Vlc3QgVXNlcjo6Z2NpZDphYm11aEdrdXczbGJFUnhIeEZ4R1lZbEhwSjo6Y2hpZDogIiwiZXhwIjoxNzExNjE1NjkzLCJpYXQiOjE3MTE2MTM4OTMsImp0aSI6IkMyQzc3NTc1MzE4MjAtMTYwMDU0NTkwNzI5NzA5MjE5MzgzNTEzNjQifQ.8jcOwzOUnmayTcjyw9OwyesJqT-jAptSosPdEqtajWe2iXRfc4dt23QTX36rrre38z9UQbc_tJexXU0BUqW7HA`,
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "77a2013e63cd5c975a959df3511b1dee",
  "X-Algolia-Application-Id": "JTHJTRLJS2",
  Dnt: "1",
};

export const getDolceGabbanaDeliveryEstimates = async ({
  variants,
}: GeneralProductItem) => {
  // const isExpressAvailable = variants.find((x) => x.gucciAvailableForPickup);
  return {
    data: {
      merchantDeliveryDate: new Date(Date.now() + 691_000_000), // 7 days
      deliveryDate: new Date(Date.now() + 691_000_000), // 7 days
      isExpress: Boolean(false),
      isFallback: true,
    },
  };
};

export const getDolceGabbanaSearchResults = async ({
  page = "1",
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
  const query = category
    ? `${category} `
    : searchValue.length > 2
    ? `${searchValue}`
    : "";

  const searchParams = new URLSearchParams({
    "x-algolia-agent": "Algolia for JavaScript (4.20.0); Browser (lite)",
  });

  let payload = {
    hitsPerPage: 100,
    attributesToRetrieve: ["*"],
    page: pageId,
    query,
  };

  const response = await fetch(
    `https://jthjtrljs2-dsn.algolia.net/1/indexes/production_eu05_tlg_demandware_net__dolcegabbana__products__en/query?${searchParams.toString()}`,
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
      "[EXCEPTION] search result error scrapers/dolce-gabbana/methods.ts",
      "[ERROR] banned by Dolce Gabbana"
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const json: AlgoliaSingleResponse<any> = await response.json();

  if (!json.hits || json.hits.length === 0) {
    console.log(json);
    console.log(
      "[EXCEPTION] search result error scrapers/dolce-gabbana/methods.ts",
      "[ERROR] Results not found on Docle Gabbana, THIS IS PROBABLY JUST INVALID SEARCH, NOT THROW ERROR"
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

  const getPrice = (product: SearchResultItem): ListPrice | undefined => {
    try {
      const keys = Object.keys(product.price);
      for (const key of keys) {
        const price = (product.price as any)[key];
        if (price !== undefined) {
          return price;
        }
      }
      return undefined; // Return undefined if no price is found
    } catch (error) {
      return undefined;
    }
  };

  const ruble_rate = await getRubleRate();

  // console.log(json.hits[0]);
  const price_converted_products: GeneralSearchResultProductItem[] =
    json?.hits.map((product) => {
      const price = getPrice(product)?.listPrice;
      return {
        id: product.objectID,
        objectID: product.objectID,
        title: product.name.replace("DOLCE&GABBANA", "").replace("BLANCO", ""),
        currency: "RUB",
        gender: [product.searchable_categories.level_2],
        category: Object.keys(product.searchable_categories).map(
          (key) => product.searchable_categories[key]
        ),
        brand: {
          id: "dolcegabbana",
          name: "Dolce Gabbana",
          description: "Dolce Gabbana",
        },
        variants:
          product?.all_sizes?.map(({ size, pids }: any) => ({
            id: pids[0],
            size: size,
            price: Number(price) * 1.2 * ruble_rate,
            type: "Size",
          })) || [],
        images: product.image_groups[0]?.images.map(
          ({ dis_base_link }: any, i: number) => ({
            url: dis_base_link,
            order: i + 1,
            size: "1000",
          })
        ),
        slug: generateProductUrlHandleForSearchResultItem(product),
        price: Number(price) * 1.2 * ruble_rate,
      };
    });

  return {
    totalItems,
    totalPages,
    currentPage,
    products: price_converted_products as any,
    categories: [],
  };
};
