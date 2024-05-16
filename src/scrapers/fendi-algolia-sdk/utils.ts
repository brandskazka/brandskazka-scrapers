import { ExternalMerchantId } from "@/types";
import { FendiItem } from "./types";

export function generateProductUrlHandle({ id, name }: FendiItem) {
  const merchantId: ExternalMerchantId = "fendi";
  const brand = "fendi";

  const shortDescription = name
    .toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
