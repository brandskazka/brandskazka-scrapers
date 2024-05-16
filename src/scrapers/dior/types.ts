export type Image = {
  url: string;
  altText: string;
};

export type DeliveryEstimateResponse = {
  data: {
    product: {
      variations: Array<{
        boutiqueStocks: any[];
      }>;
    };
  };
};

export type SearchResultPrice = {
  sales: {
    value: number;
  };
};

export type SearchResultItem = {
  assets: {
    images: {
      product: {
        gh: Array<{
          alt: string;
          uri: string;
        }>;
      };
    };
  };
  categories_int: Array<string>;
  category_int_lvl0: string;
  title_int: string;
  subtitle_int: string;
  variants: Array<{
    price: { amount: number };
    size: string;
    sizeFormatted: string;
    ean: string;
    sku: string;
  }>;
  objectID: string;
};

export type SingleItem = {
  code: string;
  name: string;
  description: string;
  availableForPickup: boolean;
  // price: Price;
  images: Image[];
  // variantOptions: VariantOption[];
  primaryImageData: {
    format: string;
  };
};
