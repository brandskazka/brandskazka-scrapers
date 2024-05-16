import type { CartItem, ExternalMerchantId, NotRequired } from "@/types";
import { IS_DEV_MODE } from "./data";

const currentTime = new Date().toLocaleTimeString();

export const logger = {
  DEV_LOG_ONLY: (...props: any): void => {
    if (IS_DEV_MODE) {
      console.log(`${currentTime} ::`, ...props);
    }
  },
};

export const parseCookie = (cookieName: string): NotRequired<string> => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

export const ensureStartsWith = (
  stringToCheck: string,
  startsWith: string
): string =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export function roundUpPrice(price?: number): number {
  return Math.ceil(Number(price) / 100) * 100;
}

export function formatPrice(number?: number): string {
  // Convert the number to a string
  const formattedPrice = roundUpPrice(number);
  const numberString = String(formattedPrice.toFixed(0));

  // Split the string into groups of three digits from the right
  const groups = numberString.split(/(?=(?:\d{3})+(?!\d))/);

  // Join the groups with a space and return the result
  return groups.join(" ");
}

export async function getRubleRate(): Promise<number> {
  const response = await fetch("https://open.er-api.com/v6/latest/EUR");
  const json = await response.json();

  if (response.ok) {
    const rate = Number(json?.rates?.["RUB"]);
    return rate;
  } else {
    return 0;
  }
}

export function parseProductUrlHandle(handle: string): {
  merchantId: ExternalMerchantId;
  variantId?: string;
  productId: string;
} {
  let variantId: string | undefined;

  if (handle.startsWith("http")) {
    const url = new URL(handle);
    const searchParams = url.searchParams.toString();

    if (searchParams) {
      handle = handle.replace(url.search, "");
      variantId = url.searchParams.get("variant") || undefined;
    }
  }

  const parts = handle.split(/--|-/);

  if (parts.length >= 3) {
    const merchantId = parts[parts.length - 2] as ExternalMerchantId;
    const productId = parts[parts.length - 1] as string;

    return { merchantId, productId, variantId };
  }

  // Return a default object or handle this case according to your needs
  return { merchantId: "...", productId: "" };
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomString = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const calculateTotalItemsPrice = (cartItems: CartItem[]): number => {
  const deliveryPrice = cartItems.reduce((acc, { variant }) => {
    return acc + (variant?.price || 0);
  }, 0);
  return deliveryPrice;
};

export function capitalizeFirstLetter(string: string): string {
  if (typeof string !== "string" || string.length === 0) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeHtmlTags(input?: string): NotRequired<string> {
  return input?.replace(/<[^>]*>/g, "");
}

export const parseSrcSet = (srcSet?: string) => {
  if (!srcSet) return null;
  // Regex to match the URL and its associated descriptor (1x, 2x, 1920w, etc.)
  const regex = /([^\s]+)\s+(\d+w|\d+x)/g;
  let match;
  const sources = [];

  // Iterate over all matches
  while ((match = regex.exec(srcSet)) !== null) {
    const url = match[1];
    const descriptor = match[2];
    const value = parseInt(descriptor, 10); // Parse the numeric part of the descriptor

    // Store the URL and its numeric descriptor value
    sources.push({ url, value });
  }

  // Sort the sources by their descriptor value in descending order
  sources.sort((a, b) => b.value - a.value);

  // Return the URL with the highest descriptor value
  return sources.length > 0 ? sources[0].url : null;
};
