import { getRubleRate, parseSrcSet } from "@/lib/utils";
import { GeneralSearchResultProductItem, SearchResultsHandler } from "@/types";
import { load } from "cheerio";
import fs from "fs";

export function generateProductUrlHandle({ objectID, Title }: any) {
  const merchantId = "celine";
  const brand = "celine";

  const shortDescription = Title.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}

export const getCelineSearchResults = async ({
  page = "1",
}: {
  page?: string;
  searchValue?: string;
  category?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  //
  const pageId = parseInt(page) - 1;
  const gender = "Men";

  const products: any[] = [];

  // q=women&prefn1=celShowInSearch&prefv1=true&start=40&sz=20
  const searchParams = new URLSearchParams({
    q: "women",
    prefn1: "celShowInSearch",
    prefv1: "true",
    start: String(pageId * 20),
    sz: "20",
  });

  const ruble_rate = await getRubleRate();

  const response = await fetch(
    `https://www.celine.com/on/demandware.store/Sites-CELINE_FR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`
  );

  const html = await response.text();
  const $ = load(html);

  if (response.status !== 200) {
    console.log("response status is bad in getCelineSearchResults");
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  //   fs.writeFileSync("body.html", html, "utf8");

  $(".m-product-listing").each((i, el) => {
    const product = $(el);
    const images: any[] = [];

    const unparsed_json = product.find("a").attr("data-gtm-data") as string;
    const json = JSON.parse(decodeURIComponent(unparsed_json));

    $(el)
      .find(".m-product-listing__img-img > img")
      .each((i, img_el) => {
        const image = $(img_el).attr("data-lazy-srcset");
        images.push({
          url: parseSrcSet(image),
          order: i + 1,
          size: "1000",
        });
      });

    products.push({
      id: json.id,
      objectID: json.id,
      title: json.name,
      currency: "RUB",
      gender: [gender],
      category: [
        json?.category,
        json?.productMidCategory,
        json?.productSuperCategory,
        json?.productMasterId,
      ],
      brand: {
        id: "celine",
        name: "Celine",
        description: "Celine",
      },
      images,
      slug: generateProductUrlHandle({ objectID: json.id, Title: json.name }),
      price: json.price * 1.2 * ruble_rate,
    });
  });

  const totalPages = $(".o-search_options-pagination").children().length;

  return {
    totalItems: totalPages * 20,
    totalPages,
    currentPage: pageId,
    products: products,
    categories: [],
  };
};
