import { getRubleRate, parseSrcSet } from "@/lib/utils";
import { GeneralSearchResultProductItem, SearchResultsHandler } from "@/types";
import { load } from "cheerio";

export function generateProductUrlHandle({ objectID, Title }: any) {
  const merchantId = "bottega";
  const brand = "bottega";

  const shortDescription = Title.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}

export const getBottegaSearchResults = async ({
  page = "1",
}: {
  page?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  //
  const pageId = parseInt(page) - 1;
  const gender = "Women";

  const products: any[] = [];

  const searchParams = new URLSearchParams({
    q: "",
    prefn1: "akeneo_employeesSalesVisible",
    prefv1: "false",
    prefn2: "akeneo_gender",
    prefv2: gender === "Women" ? "D" : "U",
    prefn3: "akeneo_markDownInto",
    prefv3: "no_season",
    prefn4: "countryInclusion",
    prefv4: "FR",
    start: String(pageId * 20),
    sz: "20",
  });

  const ruble_rate = await getRubleRate();
  // console.log(
  //   `https://www.bottegaveneta.com/on/demandware.store/Sites-BV-R-WEUR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`
  // );

  const response = await fetch(
    `https://www.bottegaveneta.com/on/demandware.store/Sites-BV-R-WEUR-Site/en_FR/Search-UpdateGrid?${searchParams.toString()}`
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

  $(`article[class="c-product"]`).each((i, el) => {
    const product = $(el);
    const images: any[] = [];

    const unparsed_json = product.attr("data-gtmproduct") as string;
    const json = JSON.parse(decodeURIComponent(unparsed_json));

    $(el)
      .find(".c-product__image")
      .each((i, img_el) => {
        const image = $(img_el).attr("srcset");
        images.push({
          url: parseSrcSet(image),
          order: i + 1,
          size: "1000",
        });
      });

    const item = {
      id: json.id,
      objectID: json.id,
      title: json.name,
      currency: "RUB",
      gender: [gender],
      backend: "salesforce",
      category: json?.category.split("-"),
      brand: {
        id: "bottega",
        name: "Bottega Veneta",
        description: "Bottega Veneta",
      },
      images,
      slug: generateProductUrlHandle({ objectID: json.id, Title: json.name }),
      price: json.discountPrice * 1.2 * ruble_rate,
    };

    // console.log(item);
    products.push(item);
  });

  const regex = /of (\d+) products/;
  const totalItems_match = $(".c-loadmore__count").text().match(regex) || [];
  const totalItems = parseInt(totalItems_match[1], 10);

  return {
    totalItems: totalItems * 20,
    totalPages: Math.ceil(totalItems / 20),
    currentPage: pageId,
    products: products,
    categories: [],
  };
};
