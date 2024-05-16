// these methods are duplicates of what we use in production, scrapers should follow the generalized type of objects so we can just plug it in

import type {
  ExternalMerchantId,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  SearchResultsHandler,
} from "@/types";
import { regex } from "@/scrapers/patterns";
import { logger } from "@/lib/utils";
import { getGucciSearchResults } from "@/scrapers/gucci";

/* 
    {productId} and {merchantId} are parsed from the url 
    ----------------------------------------------------
    - we use {productId} fetched from the retailer as the key identifier on our end
    - merchantId is our internal identifier for the retailer
*/

export const getProduct = async ({
  productId,
  merchantId,
}: {
  productId: string;
  merchantId: ExternalMerchantId;
}): Promise<GeneralProductItem | null> => {
  switch (merchantId) {
    //   case 'gucci':
    //     return await getGucciProduct({ productId });
    default:
      return null;
  }
};

// discuss with Masha what retailers require real time delivery estimated (e.g. for instore pickup) and fallback the others
export const getDeliveryEstimates = async ({
  product,
  merchantId,
}: {
  product: GeneralProductItem;
  merchantId: ExternalMerchantId;
}) => {
  switch (merchantId) {
    // case 'ff':
    //   const farfetchMarchantId = product.variants?.[0]?.farfetchMerchantId;
    //   return await getFarfetchDeliveryEstimates({ merchantId: farfetchMarchantId });
    default:
      return {
        error: "Invalid or {ExternalMerchantId} was not provided",
      };
  }
};

export const getSearchResults = async ({
  page = "1",
  gender,
  searchValue,
  category,
  brandId,
  merchantId = "ff",
}: {
  page?: string;
  gender?: Gender;
  searchValue?: string;
  category?: string;
  brandId?: string;
  merchantId?: ExternalMerchantId;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  const isGucci = searchValue?.toLowerCase().match(regex.gucci);

  if (isGucci || merchantId === "gucci") {
    logger.DEV_LOG_ONLY("matched gucci input!!", searchValue);

    const query = searchValue
      ?.toLocaleLowerCase()
      .replace(regex.gucci, "")
      .trim()
      .replace("gucci", "");

    return getGucciSearchResults({
      page,
      searchValue: query,
      category,
      genderSlug: gender,
    });
  }

  // logger.DEV_LOG_ONLY('fallback to Farfetch search if no params have been matched');
  // return getFarfetchSearchResults({ page, genderSlug: gender, searchValue, category, brandId });
  return {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    products: [],
    categories: [],
  };
};
