export type MiuMiuImage = {
  link: string;
  label: string;
};

export type MiuMiuPrice = {
  currency: "EUR";
  value: number;
};

type LoroPianaName = {
  en: string[];
};

export type SearchResultItem = {
  name: LoroPianaName;
  imgfrontsmall: string;
  imgbacksmall: string;
  priceValue: number;
  productCategory: string;
  objectID: string;
  genderNameEn: string;
  size: string[];
  categoryName: {
    en: string[];
  };
};

export type LoroPianaProductSize = {
  code: string; // value
  variantCode: string;
};

type ImageObject = {
  format: "THUMBNAIL" | "MEDIUM" | "LARGE" | "ZOOM";
  url: string;
};

type ImageContainer = {
  formats: ImageObject[];
};

export type ProductItem = {
  variantCode: string;
  description: string;
  originCountry: string;
  sizes: LoroPianaProductSize[];
  imagesContainers: ImageContainer[];
  productName: string;
};
