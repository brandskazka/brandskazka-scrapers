import { parse } from "node-html-parser";
import {
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  SearchResultsHandler,
} from "@/types";
import {
  generateProductUrlHandleForSearchResultItem,
  generateProductUrlHandleForSingleItem,
} from "./utils";
import { getRubleRate } from "@/lib/utils";

export const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "X-Algolia-Api-Key": "60ae41b45f76d3fdbbefa93988cca3a4",
  "X-Algolia-Application-Id": "3GPIT4ZPFD",
  Dnt: "1",
};

export const getAlaiaSearchResults = async ({
  page = "1",
}: {
  page?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  const pageId = parseInt(page) - 1;

  const response = await fetch(
    `https://www.maison-alaia.com/Search/RenderProductsAsync?agerange=&authorlocalized=&brand=&collection=&color=&colortype=&department=vwll&departmentId=&environment=&fabric=&fabricColor=&facetsvalue=&family=&filter=&gallery=&gender=&heeltype=&issale=&itembinding=&itemsToLoadOnNextPage=16&linkdepartment=&linkdepartmentId=&look=&macro=&macroMarchio=&material=&micro=&microcolor=&minMaxPrice=&model=&modelFabric=&modelnames=&occasion=&page=${pageId}&partialLoadedItems=16&price=&prints=&productsPerPage=16&rsiUsed=false&sale=False&salesline=&searchType=&season=&section=&site=&size=&sortRule=&stone=&structure=&style=&suggestion=false&suggestionValue=&textSearch=&textSearchFilters=&themecollection=&totalItems=501&totalPages=32&virtualnavigation=&waist=&washtype=&wedge=&weight=&ytosQuery=true&yurirulename=&siteCode=ALAIA_GB`
  );

  if (response.status !== 200) {
    const json = await response.json();
    console.log(json);
    console.log(
      "[EXCEPTION] search result error scrapers/alaia/methods.ts",
      "[ERROR] banned by alaia"
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const body = await response.text();
  const $ = parse(body);

  const hits = Array.from($.querySelectorAll(".product-box")).map((el) => {
    const article = el?.getAttribute("data-ytos-track-product-data") || "";
    const image = el.querySelector("a > div > img")?.getAttribute("src") || "";
    const code =
      el
        .querySelector("a")
        ?.getAttribute("href")
        ?.replace("/fr/", "")
        ?.replace(".html", "") || "";
    const formatted_article = JSON.parse(article);
    return {
      category: [
        formatted_article.product_category,
        formatted_article.product_macro_category,
        formatted_article.product_micro_category,
      ],
      name: formatted_article.product_title || "",
      price: formatted_article.product_discountedPrice || "",
      id: code.replace("/gb/", ""),
      image: image,
    };
  });

  const {
    totalPages,
    totalItems,
    number: currentPage,
  } = {
    totalPages: 12,
    totalItems: hits.length + 448,
    number: 1,
  };

  const ruble_rate = await getRubleRate();
  const price_converted_products: GeneralSearchResultProductItem[] = hits.map(
    ({ name, price, id, image, category }, i) => ({
      id,
      objectID: id,
      title: name,
      currency: "RUB",
      gender: ["Women"],
      backend: "custom",
      category,
      brand: {
        id: "alaia",
        name: "Alaia",
        description: "Alaia",
      },
      images: [
        {
          url: image,
          order: i + 1,
          size: "1000",
        },
      ],
      slug: generateProductUrlHandleForSearchResultItem({ name, id }),
      price: parseInt(price) * 1.2 * ruble_rate,
    })
  );

  return {
    totalItems: 501,
    totalPages: 32,
    currentPage,
    products: price_converted_products,
    categories: [],
  };
};
