import { ExternalMerchantId } from "@/types";
import { SearchResultItem } from "./types";

export function generateProductUrlHandle({
  objectID,
  nameEN,
}: SearchResultItem) {
  const merchantId: ExternalMerchantId = "armani";
  const brand = "armani";

  const productId = objectID;
  const productName = nameEN;

  const shortDescription = productName
    ?.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${productId}`;
}
