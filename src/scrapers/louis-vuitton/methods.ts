import { getRubleRate } from "@/lib/utils";

import {
  DeliveryEstimate,
  Gender,
  GeneralProductItem,
  GeneralSearchResultProductItem,
  ProductVariant,
  ResponseHandler,
  SearchResultsHandler,
} from "@/types";
import { generateProductUrlHandle } from "./utils";

export const FARFETCH_TOKEN = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFCMzk0QzY0Q0JCM0Y3RDIyNDY0OUVCNjQ5RkNBM0ZEM0I5NDhERTMiLCJ4NXQiOiJHemxNWk11ejk5SWtaSjYyU2Z5al9UdVVqZU0iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwOi8vZmFyZmV0Y2guY29tIiwibmJmIjoxNzA3Nzc3NDgzLCJpYXQiOjE3MDc3Nzc0ODMsImV4cCI6MTcwODM4MjI4MywiYXVkIjpbImFwaSIsImNvbW1lcmNlLmJhZ3MucmVhZCIsImNvbW1lcmNlLmJhZ3Mud3JpdGUiLCJjb21tZXJjZS5jYXRhbG9nIiwiY29tbWVyY2UubWVyY2hhbnRzIiwiY29tbWVyY2UucHJvbW9ldmFsdWF0aW9ucy5yZWFkIiwiY29tbWVyY2UucHJvbW90aW9ucyIsImNvbW1lcmNlLnJldHVybnMiLCJjb21tZXJjZS5zaXplcHJlZGljdC5yZWFkIiwiY29tbWVyY2UudXNlcmJlbmVmaXRzIiwiY29tbWVyY2UudXNlcnMucHJvbW9jb2RlcyIsImNvbW1lcmNlLnZhc3Npc3RhbnQuY2hhdC5yZWFkIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LndyaXRlIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMucmVhZCIsImNvbW1zLmluYm94bXNncHJ2Lm1lc3NhZ2VzLndyaXRlIiwiZGF0YS5lc3RpbWF0ZWRkZWxpdmVyeWRhdGUiLCJleHBlcmltZW50YXRpb24uZnRvZ2dsZS5yZWFkIiwiZmFicyIsIm1rdC5jb250ZXh0dWFsbWVzc2FnZXMucmVhZCIsIm1rdC5zcGVuZGxldmVscHJvZ3JhbS5yZWFkIiwic3RvcmFnZS5maWxlYXBpLmRvd25sb2FkIiwiaHR0cDovL2ZhcmZldGNoLmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsiYXBpIiwiY29tbWVyY2UuYmFncy5yZWFkIiwiY29tbWVyY2UuYmFncy53cml0ZSIsImNvbW1lcmNlLmNhdGFsb2ciLCJjb21tZXJjZS5tZXJjaGFudHMiLCJjb21tZXJjZS5wcm9tb2V2YWx1YXRpb25zLnJlYWQiLCJjb21tZXJjZS5wcm9tb3Rpb25zIiwiY29tbWVyY2UucmV0dXJucyIsImNvbW1lcmNlLnNpemVwcmVkaWN0LnJlYWQiLCJjb21tZXJjZS51c2VyYmVuZWZpdHMiLCJjb21tZXJjZS51c2Vycy5wcm9tb2NvZGVzIiwiY29tbWVyY2UudmFzc2lzdGFudC5jaGF0LnJlYWQiLCJjb21tZXJjZS52YXNzaXN0YW50LmNoYXQud3JpdGUiLCJjb21tcy5pbmJveG1zZ3Bydi5tZXNzYWdlcy5yZWFkIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMud3JpdGUiLCJkYXRhLmVzdGltYXRlZGRlbGl2ZXJ5ZGF0ZSIsImV4cGVyaW1lbnRhdGlvbi5mdG9nZ2xlLnJlYWQiLCJmYWJzIiwibWt0LmNvbnRleHR1YWxtZXNzYWdlcy5yZWFkIiwibWt0LnNwZW5kbGV2ZWxwcm9ncmFtLnJlYWQiLCJzdG9yYWdlLmZpbGVhcGkuZG93bmxvYWQiXSwiY2xpZW50X2lkIjoiMTlBQjgzQTM3RDgwNDcxMUFDREJDRkE2NDNGRTQzNUQiLCJjbGllbnRfdWlkIjoiMTAwMDIiLCJjbGllbnRfdGVuYW50SWQiOiIxMDAwMCIsImNsaWVudF9ndWVzdCI6IjUwMDAwMjQxNjkzOTMyNDUiLCJqdGkiOiIwRTE5OEVFMzUzMzQ4NTZFOUI4RDU0RkMzQzdDNUQwNyJ9.N1ozgEbGPwImbMEn7TqlT0X4R2sEHl2Op3y8uesOcyP9K_BH5mC1xLeAzBKMQrQsRdaD9GRntZSV0TL4nOqKqxBgxP9TLMTOcwiKbuVDE4hH27BJuv4Lsgql7a47lfJKSkY4Q6RX8c9I71dQuSi3Lwf1R905q3y2LqlLNDXNs-QE9m_nmgCESaaZC2dUv6N6M_Tx7CKWrn5JzApLHylK927nvwJEngHa_YwVx-AcdbS34fq3d5p2cZ_VEaG78T_srM0VTlZANzb3BJt-CsoGzbN4ThRaxbCt2KjMASP4O9klmpc4-68mjyyYwL64hCk_0Ejr45bJNf42ErN_tfzKa2F1gKpfZXievViC4EdoUgVYp0bgSK_TSTxznIKPxT-U5jo_aEfyV0aln4igmdndbyzpoWrJKMubr3Lk-45NqnqIhbB43eELWcAz-PWjGYtgERsSxx5aSCNRrCwsrltF9io8vQXHjvE5Mj-swisCiVRUGu8g1va6y-BvjDF1ANzY3uOA5lsTtmOvSk4TDDYEEVZ64rYtPLiFJxjV90tuCS3PrnepDo0LDDmRy_12P3CPpghWjvu3otI3-_RK4vYA2ScWE5pJox6naKEzfyzlJFcxpXrwi0fPaMIl5onJs553MuvdjCfWhV5ekFrBI4THq5PPIq6nwyuf5iFZCNUbb5s`;

export const defaultHeaders = {
  Client_id: "607e3016889f431fb8020693311016c9",
  Client_secret: "60bbcdcD722D411B88cBb72C8246a22F",
  "Accept-Language": "ru-RU",
  "FF-Country": `FR`,
  "FF-Currency": `EUR`,
};

export const getLouisVuittonSearchResults = async ({
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
  const query = ``;
  const pageId = parseInt(page) - 1;

  const genderCode = genderSlug === "women" ? "cc1pk2mvx" : "cceuiloc";

  console.log(query);

  const searchParams = new URLSearchParams({
    keyword: query as string,
    page: String(pageId),
    urlCode: "cceuiloc", // men
    filter: "sku",
  });

  const response = await fetch(
    `https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/fra-fr/records?${searchParams.toString()}`,
    {
      headers: defaultHeaders,
    }
  );

  if (response.status !== 200) {
    const text = await response.text();
    console.log(
      "[EXCEPTION] search result error scrapers/louis-vuitton/methods.ts",
      "[ERROR] banned by LV",
      text
    );
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  const json: {
    skus: {
      hits: any[];
      nbHits: number;
      nbPages: number;
    };
  } = await response.json();

  console.log(json.skus.hits);

  const ruble_rate = await getRubleRate();

  console.log(json.skus.hits[0]?.offers?.priceSpecification?.[0]);
  // const price_converted_products: GeneralSearchResultProductItem[] =
  const price_converted_products: any[] = json.skus.hits.map((product) => {
    try {
      return {
        id: product.productId,
        objectID: product.productId,
        title: product.name,
        currency: "RUB",
        gender: [
          product.additionalProperty.find((x: any) => x.name === "gender")
            ?.value,
        ],
        category: product.category[0].map((x: any) => x.alternateName),
        brand: {
          id: "lv",
          name: "Louis Vuitton",
          description: "Louis Vuitton",
        },
        images: [
          {
            url: product.image[0]?.contentUrl as string,
            size: "1000",
            order: 1,
          },
        ],
        slug: generateProductUrlHandle(product),
        price:
          parseFloat(
            (product?.offers?.priceSpecification?.[0]?.price as string)
              ?.replace(/[^\d,.-]/g, "")
              ?.replace(",", ".")
          ) *
          1.2 *
          ruble_rate,
      };
    } catch (error) {
      console.log("Error parsing product", product);
      return undefined;
    }
  });

  return {
    totalItems: json.skus.nbHits,
    totalPages: json.skus.nbPages,
    currentPage: pageId,
    products: price_converted_products,
    categories: [],
  };
};
