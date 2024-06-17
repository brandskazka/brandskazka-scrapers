export type NotRequired<T> = T | undefined | null;
export type Gender = "women" | "men" | "kids";

export type ExternalMerchantId = string;

type ProductId = string | number;

export type FarfetchCategory = {
  id: number | string;
  name: string;
  parentId?: number;
  gender?: string;
  uuid: string;
};

export type FarfetchImage = {
  order: number;
  size: string;
  url: string;
};

export type FarfetchBrand = {
  id: number | string;
  name: string;
  description: string;
};

export type GeneralProductItem = {
  id: ProductId;
  slug: string;
  title: string;
  merchantId?: ExternalMerchantId;
  brand: FarfetchBrand;
  description?: string;
  styleId: string;
  madeIn?: string;
  categories: FarfetchCategory[];
  images: FarfetchImage[];
  variants: ProductVariant[];
};

export type GeneralSearchResultProductItem = {
  id: ProductId;
  objectID: ProductId;
  slug: string;
  title: string;
  gender: string[];
  updatedAt: Date | string;
  backend: "salesforce" | "algolia" | "custom" | "farfetch";
  currency: string | number;
  price: number;
  brand: FarfetchBrand;
  images: FarfetchImage[];
  category: string[];
};

type ProductVariantTypes = "Size" | "Color" | "Model";

export type ExternalMerchantVariantProperties = {
  farfetchMerchantId?: number;
  louisVuittonStyleCodeId?: string;
};

export type ProductVariant = ExternalMerchantVariantProperties & {
  id: string;
  type: ProductVariantTypes;
  size?: string;
  color?: string;
  price?: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

export type CartItem = {
  product: GeneralProductItem;
  variant: ProductVariant;
};

export type Wishlist = {
  id: string;
  items: WishlistItem[];
};

export type WishlistItem = {
  product: GeneralProductItem;
  variant?: ProductVariant;
};

export type CustomerShippingAddress = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zip: string;
  country: string;
};

export type OrderStatusTypes =
  | "confirmed"
  | "processed"
  | "shipped"
  | "awaiting-payment"
  | "cancelled"
  | "refunded";

export type OrderStatusTypesAirtable =
  | "Confirmed"
  | "Processed"
  | "Shipped"
  | "Awaiting Payment"
  | "Cancelled"
  | "Refunded";

export type DeliveryMethodsAirtable = "UPS" | "DPD" | "Courier";

export type Customer = {
  createdAt: Date;
  id: string;
  email: string;
  password: string;
  isEmailVerified?: boolean;
  emailHash?: string | null;
  name?: string;
  phone?: string;
  shippingAddress?: CustomerShippingAddress;
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type ConditionalResponseHandler<T> =
  | {
      data: T;
      error?: never;
    }
  | {
      data?: never;
      error: string;
    };

export type SearchResultsHandler<T> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  products: T[];
  categories: SearchResultCategory[];
};

export type SearchResultCategory = {
  type?: string;
  parentId?: number;
  id: string | number;
  title: string;
};

export type ResponseHandler<T> = {
  data?: T;
  error?: string;
};

export type DeliveryEstimate = {
  isFallback?: boolean;
  isExpress?: boolean;
  merchantDeliveryDate: Date;
  deliveryDate: Date;
};

export type AlgoliaSingleResponse<T> = {
  hitsPerPage: number;
  hits: T[];
  nbHits: number;
  nbPages: number;
  page: number;
};

export type AlgoliaMultiResponse<T> = {
  results: AlgoliaSingleResponse<T>[];
};
