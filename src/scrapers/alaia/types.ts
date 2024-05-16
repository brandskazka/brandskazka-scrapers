export type Image = {
  url: string;
  altText: string;
};

export type SearchResultPrice = {
  sales: {
    value: number;
  };
};

export type SearchResultItem = {
  // objectID: string;
  masterId: string;
  name: string;
  price: SearchResultPrice;
  primary: {
    medium: Array<{
      url: string;
    }>;
  };
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
