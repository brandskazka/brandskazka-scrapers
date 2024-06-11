import { getRubleRate } from "@/lib/utils";
import type { GeneralSearchResultProductItem } from "@/types";

type Gender = "men" | "women" | "kids";
export const gender: Gender = "kids";

let headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
  "X-Store": "FR",
  "X-Country": "FR",
  "X-Region": "BY",
  "X-Section": gender,
  "Accept-Language": "en",
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 mythapp (5.8.1 build 202405160 react-native; Apple iPhone 15 Pro; en-us|US; iOS 17.5.1)",
};

export const getAllBrands = async () => {
  headers["X-Section"] = gender;

  const body = JSON.stringify({
    operationName: "DesignerListQuery",
    variables: { designerCategoryId: null },
    query:
      "query DesignerListQuery($designerCategoryId: String) {\n  designerList(designerCategoryId: $designerCategoryId) {\n    letter\n    designers {\n      name\n      slug\n      flag\n      __typename\n    }\n    __typename\n  }\n}\n",
  });

  const response = await fetch("https://api.mytheresa.com/api", {
    method: "POST",
    headers,
    body,
  });

  const json = await response.json();

  let designers: { name: string; slug: string }[] = [];
  const designerList = json.data.designerList;

  for (const designerSection of designerList) {
    const designersInSection = designerSection.designers;
    for (const { name, slug } of designersInSection) {
      if (slug && name) {
        designers.push({ name, slug });
      }
    }
  }

  return designers;
};

function parseCategories(input: string) {
  const regex = /::(?:[^:']*')?([^:']+)/g;
  let matches;
  const categories = [];

  // Iterate over the matches and push the cleaned categories into the array
  while ((matches = regex.exec(input)) !== null) {
    const category = matches[1].trim(); // Extract the matched category and trim any leading/trailing whitespace
    if (category) {
      categories.push(category);
    }
  }
  return categories;
}

export const getAllProducts = async (page: number = 1, slug: string) => {
  const ruble_rate = await getRubleRate();

  const body = {
    operationName: "XProductListingPageQuery",
    variables: {
      categories: [],
      colors: [],
      designers: [],
      fta: null,
      page: 1,
      patterns: [],
      reductionRange: [],
      saleStatus: null,
      size: 60,
      sizesHarmonized: [],
      slug: slug
        .replace("men/", "/")
        .replace("women/", "/")
        .replace("kids/", "/")
        .replace("wo/", "/"),
      sort: null,
    },
    query:
      "query XProductListingPageQuery($categories: [String], $colors: [String], $designers: [String], $fta: Boolean, $page: Int, $patterns: [String], $reductionRange: [String], $saleStatus: SaleStatusEnum, $size: Int, $sizesHarmonized: [String], $slug: String, $sort: String) {\n  xProductListingPage(categories: $categories, colors: $colors, designers: $designers, fta: $fta, page: $page, patterns: $patterns, reductionRange: $reductionRange, saleStatus: $saleStatus, size: $size, sizesHarmonized: $sizesHarmonized, slug: $slug, sort: $sort) {\n    id\n    alternateUrls {\n      language\n      store\n      url\n      __typename\n    }\n    breadcrumb {\n      id\n      name\n      slug\n      __typename\n    }\n    combinedDepartmentGroupAndCategoryErpID\n    department\n    designerErpId\n    displayName\n    facets {\n      categories {\n        name\n        options {\n          id\n          name\n          count\n          slug\n          children {\n            id\n            name\n            count\n            slug\n            children {\n              id\n              name\n              count\n              slug\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        activeValue\n        __typename\n      }\n      designers {\n        name\n        options {\n          value\n          count\n          slug\n          __typename\n        }\n        activeValue\n        __typename\n      }\n      colors {\n        name\n        options {\n          value\n          count\n          __typename\n        }\n        activeValue\n        __typename\n      }\n      fta {\n        activeValue\n        name\n        options {\n          value\n          count\n          __typename\n        }\n        visibility\n        __typename\n      }\n      patterns {\n        name\n        options {\n          value\n          count\n          __typename\n        }\n        activeValue\n        __typename\n      }\n      reductionRange {\n        activeValue\n        name\n        options {\n          count\n          value\n          __typename\n        }\n        unit\n        visibility\n        __typename\n      }\n      saleStatus {\n        activeValue\n        name\n        options {\n          count\n          value\n          __typename\n        }\n        visibility\n        __typename\n      }\n      sizesHarmonized {\n        name\n        options {\n          value\n          count\n          __typename\n        }\n        activeValue\n        __typename\n      }\n      __typename\n    }\n    isSalePage\n    pagination {\n      currentPage\n      itemsPerPage\n      totalItems\n      totalPages\n      __typename\n    }\n    products {\n      combinedCategoryErpID\n      combinedCategoryName\n      description\n      designer\n      designerErpId\n      designerInfo {\n        displayName\n        designerId\n        slug\n        __typename\n      }\n      fta\n      hasMultipleSizes\n      hasStock\n      displayImages\n      labels\n      mainPrice\n      name\n      price {\n        currencyCode\n        currencySymbol\n        discount\n        extraDiscount\n        includesVAT\n        original\n        percentage\n        regionalRulesModifications {\n          priceColor\n          __typename\n        }\n        trackedPrices {\n          ...trackedPrices\n          __typename\n        }\n        vatPercentage\n        __typename\n      }\n      promotionLabels {\n        label\n        type\n        __typename\n      }\n      isComingSoon\n      isPurchasable\n      seasonCode\n      sellerOrigin\n      sets\n      sizeTag\n      sizeType\n      sizesOnStock\n      sku\n      slug\n      variants {\n        availability {\n          hasStock\n          lastStockQuantityHint\n          __typename\n        }\n        price {\n          original\n          discount\n          regionalRulesModifications {\n            priceColor\n            __typename\n          }\n          __typename\n        }\n        size\n        sizeHarmonized\n        sku\n        __typename\n      }\n      __typename\n    }\n    sort {\n      currentParam\n      params\n      __typename\n    }\n    __typename\n  }\n  plpPage(slug: $slug) {\n    comingSoon\n    content\n    description\n    metadata {\n      canonical\n      description\n      keywords\n      robots\n      title\n      __typename\n    }\n    name\n    slug\n    __typename\n  }\n}\n\nfragment trackedPrices on XSharedProductTrackedPricesType {\n  price\n  priceVatOnly\n  priceReduced\n  priceReducedVatOnly\n  priceFinalDuties\n  priceEur\n  priceEurVatOnly\n  priceEurReduced\n  priceEurReducedVatOnly\n  priceEurFinalDuties\n  priceHint\n  isOnSale\n  saleDiscount\n  __typename\n}\n",
  };

  const response = await fetch("https://api.mytheresa.com/api", {
    method: "POST",
    headers: {
      Host: "api.mytheresa.com",
      "X-Store": "FR",
      "X-Country": "FR",
      "X-Section": slug.split("/")[0],
      "Accept-Language": "en",
    },
    body: JSON.stringify(body),
  });

  const json: any = await response.json();

  const pagination = {
    ...json.data.xProductListingPage.pagination,
  };

  const products: GeneralSearchResultProductItem =
    json.data.xProductListingPage.products.map((product: any) => ({
      id: product.sku,
      objectID: product.sku,
      title: product.name,
      currency: "RUB",
      gender: [gender],
      backend: "algolia",
      category: parseCategories(product.combinedCategoryName),
      brand: {
        id: product.designer
          ?.toString() // Convert input to string
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading and trailing whitespace
          .normalize("NFD") // Normalize characters to decomposed form
          .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
          .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace consecutive hyphens with a single hyphen
          .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
          .replaceAll("/", "-"),
        name: product.designer,
        description: product.designer,
      },
      images: product.displayImages.map((url: any, i: number) => ({
        url,
        order: i + 1,
        size: "1000",
      })),
      variants: product.variants.map((variant: any) => ({
        id: variant.sku,
        type: "Size",
        size: variant.size,
        price: (variant.price.discount / 100) * 1.2 * ruble_rate,
      })),
      slug: product.slug.replace("/", ""),
      price: (product.price.discount / 100) * 1.2 * ruble_rate,
    }));

  return {
    ...pagination,
    products: products,
  };
};
