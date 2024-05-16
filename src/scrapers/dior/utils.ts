import { ExternalMerchantId } from "@/types";
import { siteName } from "./data";
import { SearchResultItem } from "./types";

export function generateProductUrlHandle({
  objectID,
  title_int,
}: SearchResultItem) {
  const merchantId: ExternalMerchantId = siteName;
  const brand = siteName;

  const shortDescription = title_int
    ?.toString() // Convert input to string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .normalize("NFD") // Normalize characters to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .replace("/", "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}

export function formatImage(formatSize: string) {
  // Define the regular expression pattern to match the screen size at the end
  const pattern = /_[0-9]+x[0-9]+$/;

  // Remove the screen size at the end of the string
  return formatSize.replace(pattern, "_940x940");
}
