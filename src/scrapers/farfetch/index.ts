import { getRubleRate } from "@/lib/utils";
import type { GeneralSearchResultProductItem } from "@/types";
import { readFileSync } from "fs";

type Gender = "Men" | "Women" | "Kids";
export const gender: Gender = "Men";

const genders: { id: string; name: Gender; brands: string[] }[] = [
  {
    id: "141259",
    name: "Men",
    brands: readFileSync(
      "./src/scrapers/farfetch/men-brands.txt",
      "utf8"
    ).split("\n"),
  },
  {
    id: "141258",
    name: "Women",
    brands: readFileSync(
      "./src/scrapers/farfetch/women-brands.txt",
      "utf8"
    ).split("\n"),
  },
  {
    id: "141260",
    name: "Kids",
    brands: readFileSync(
      "./src/scrapers/farfetch/kids-brands.txt",
      "utf8"
    ).split("\n"),
  },
];

const activeGender = genders.find((x) => x.name === gender);

const FARFETCH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFCMzk0QzY0Q0JCM0Y3RDIyNDY0OUVCNjQ5RkNBM0ZEM0I5NDhERTMiLCJ4NXQiOiJHemxNWk11ejk5SWtaSjYyU2Z5al9UdVVqZU0iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwOi8vZmFyZmV0Y2guY29tIiwibmJmIjoxNzE4NDE1MTQ3LCJpYXQiOjE3MTg0MTUxNDcsImV4cCI6MTczNDE4MzE0NywiYXVkIjpbImFwaSIsImNvbW1lcmNlLmJhZ3MucmVhZCIsImNvbW1lcmNlLmJhZ3Mud3JpdGUiLCJjb21tZXJjZS5jYXRhbG9nIiwiY29tbWVyY2UubWVyY2hhbnRzIiwiY29tbWVyY2UucHJvbW9ldmFsdWF0aW9ucy5yZWFkIiwiY29tbWVyY2UucHJvbW90aW9ucyIsImNvbW1lcmNlLnJldHVybnMiLCJjb21tZXJjZS5zaXplcHJlZGljdC5yZWFkIiwiY29tbWVyY2UudXNlcmJlbmVmaXRzIiwiY29tbWVyY2UudXNlcnMucHJvbW9jb2RlcyIsImNvbW1lcmNlLnZhc3Npc3RhbnQuY2hhdC5yZWFkIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LndyaXRlIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMucmVhZCIsImNvbW1zLmluYm94bXNncHJ2Lm1lc3NhZ2VzLndyaXRlIiwiZGF0YS5lc3RpbWF0ZWRkZWxpdmVyeWRhdGUiLCJleHBlcmltZW50YXRpb24uZnRvZ2dsZS5yZWFkIiwiZmFicyIsIm1rdC5jb250ZXh0dWFsbWVzc2FnZXMucmVhZCIsIm1rdC5zcGVuZGxldmVscHJvZ3JhbS5yZWFkIiwic3RvcmFnZS5maWxlYXBpLmRvd25sb2FkIiwiaHR0cDovL2ZhcmZldGNoLmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsiYXBpIiwiY29tbWVyY2UuYmFncy5yZWFkIiwiY29tbWVyY2UuYmFncy53cml0ZSIsImNvbW1lcmNlLmNhdGFsb2ciLCJjb21tZXJjZS5tZXJjaGFudHMiLCJjb21tZXJjZS5wcm9tb2V2YWx1YXRpb25zLnJlYWQiLCJjb21tZXJjZS5wcm9tb3Rpb25zIiwiY29tbWVyY2UucmV0dXJucyIsImNvbW1lcmNlLnNpemVwcmVkaWN0LnJlYWQiLCJjb21tZXJjZS51c2VyYmVuZWZpdHMiLCJjb21tZXJjZS51c2Vycy5wcm9tb2NvZGVzIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LnJlYWQiLCJjb21tZXJjZS52YXNzaXN0YW50LmNoYXQud3JpdGUiLCJjb21tcy5pbmJveG1zZ3Bydi5tZXNzYWdlcy5yZWFkIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMud3JpdGUiLCJkYXRhLmVzdGltYXRlZGRlbGl2ZXJ5ZGF0ZSIsImV4cGVyaW1lbnRhdGlvbi5mdG9nZ2xlLnJlYWQiLCJmYWJzIiwibWt0LmNvbnRleHR1YWxtZXNzYWdlcy5yZWFkIiwibWt0LnNwZW5kbGV2ZWxwcm9ncmFtLnJlYWQiLCJzdG9yYWdlLmZpbGVhcGkuZG93bmxvYWQiXSwiY2xpZW50X2lkIjoiMTlBQjgzQTM3RDgwNDcxMUFDREJDRkE2NDNGRTQzNUQiLCJjbGllbnRfdWlkIjoiMTAwMDIiLCJjbGllbnRfdGVuYW50SWQiOiIxMDAwMCIsImNsaWVudF9ndWVzdCI6IjUwMDAwMjYxNDYwNzY3NTQiLCJqdGkiOiIwOEIyQzE2NzRBQTQ5NzFCNDg5NzAyRTUwODhBRENDOCJ9.ml4aAJb9RnEZUbXbPyX6V1njjoDRZIigP32PZ93A1ahP-7b8J3rLH9k5NAqotEukucNuaNvEVMReQT_voqg3JG3xM9r-pA4r8aA6yZA04CbFvCNkY9_xeqY7cY2s-n6WOwtX1DrCqv64RFd98m2_xhxwE9XzvYmSBrDL_H_pwx93eVEOzv9O0sWCRrTLKL9EDVkw_s2wDAhSN-_958Ls7V8Mc7EmfrcENASx4wrWBRpR4rZ9JTmRKcEnmQ0WzYK_ZZ3G_Kmkso8m2sR4w_pjT6kCp2q43e2aQEcHvglEr1r1LaX8jG46rQ5BWTahVXn8Df0uCnqnTWZQSsgjNUguwtix2Eu2DX4YK8vihFVjccP5Wm-97u4PwgHnRFRfAcjEcQcab1NJEx1TLpPw1x_qRDwHups7-CNSRKJOCQfjp2pldBweuaRCe4dQEbLMu2Zk2w6QpkR2Z0yU5sKhCyGtM_iodoT7lwGKR9oJ6DePht5Gr9Mf_Tok1c1qqkieqlzV35BqUWw9OSvrUF3Er4AwdOTv3LcwfHF133sgXwJskXxfpS9V5h-yfp7U__iSSrQqEQ9gjYzwITKUA2iyz3h_s8U26w_40QbfMiqShAXqTYm5L_AumC7-csyOxN6nmmncYv2qKsdQoDVSLSRx1cZtxehRFLwNQ_5Kxtv5ljzyVfk";

let headers = {
  Authorization: `Bearer ${FARFETCH_TOKEN}`,
  "Accept-Language": "en-US",
  "FF-Country": `FR`,
  "FF-Currency": `EUR`,
};

export function generateProductUrlHandle({ id, shortDescription }: any) {
  const name = shortDescription
    ?.toString() // Convert input to string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .normalize("NFD") // Normalize characters to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .replace(/-{2,}/g, "-"); // Replace multiple hyphens with a single hyphen

  return `${name}-${id}`;
}

export const getAllBrands = async () => {
  const response = await fetch(
    `https://api.farfetch.net/v1/brands?page=1&pageSize=10000&categoryId=${activeGender?.id}&priceType=0,1`,
    {
      method: "GET",
      headers,
    }
  );

  const json = await response.json();

  let designers: { name: string; id: string }[] = [];
  const designerList = json.entries;
  for (const { name, id } of designerList) {
    if (id && name) {
      if (activeGender?.brands.includes(name)) {
        designers.push({ name, id });
      }
    }
  }
  return designers;
};

export const getAllProducts = async (
  page: number = 1,
  brandId: string | number
) => {
  const products: GeneralSearchResultProductItem[] = []; // Array to store all scraped products
  const ruble_rate = await getRubleRate();

  const response = await fetch(
    `https://api.farfetch.net/v1/search/products?imagesSizes=1000&fields=currencyIsoCode,shortDescription,categories,variants,variant,id,tag,priceWithoutDiscount,images,quantity,brand,merchantId,type,price,priceType&contextFilters=priceType:0,1;categories:${activeGender?.id};brands:${brandId}&sort=ranking&pageSize=40&page=${page}&facets=ShippingFrom,Discount,Categories,SizesByCategory,Brands,Gender,Price,Colors,Attributes&includeExplanation=Ranking`,
    {
      headers,
    }
  );

  const json: any = await response.json();

  for (const product of json.products.entries) {
    const single_product_response = await fetch(
      `https://api.farfetch.net/v1/products/${product.id}?fields=price,promotions,labels,promotionPercentage,priceType,id,tag,currencyIsoCode,quantity,brand,merchantId,priceWithoutDiscount,images,type,categories,shortDescription,variants&facets=Id&page=1&contextFilters=priceType:0,1&sort=requestProductsIds&pageSize=40`,
      {
        headers,
      }
    );

    const single_product_json: any = await single_product_response.json();

    products.push({
      id: single_product_json.id,
      objectID: single_product_json.id,
      title: single_product_json.shortDescription,
      currency: "RUB",
      gender: [gender],
      backend: "farfetch",
      updatedAt: new Date().toISOString(),
      category: single_product_json.categories.map(
        (category: any) => category.name
      ),
      brand: {
        id: single_product_json.brand.name
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
        name: single_product_json.brand.name,
        description: single_product_json.brand.name,
      },
      images: single_product_json.images?.images
        ?.filter((x: any) => x.size === "1000")
        ?.map(({ url, order }: any) => ({
          url,
          order,
          size: "1000",
        })),
      variants: single_product_json.variants.map((variant: any) => ({
        id: variant?.attributes?.find((x: any) => x.type === "SizeDescription")
          ?.value,
        type: "Size",
        size: variant?.attributes?.find(
          (x: any) => x.type === "SizeDescription"
        )?.value,
        price: variant.price.priceInclTaxes * 1.2 * ruble_rate,
      })),
      slug: generateProductUrlHandle({
        id: single_product_json.id,
        shortDescription: single_product_json.shortDescription,
      }),
      price:
        single_product_json.variants?.[0]?.price?.priceInclTaxes *
        1.2 *
        ruble_rate,
    });
  }

  const pagination = {
    currentPage: page,
    totalPages: json.products.totalPages,
    totalItems: json.products.totalItems,
  };

  //   console.log(pagination, products.length, "products length");

  return {
    ...pagination,
    products: products,
  };
};
