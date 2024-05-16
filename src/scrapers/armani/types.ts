export type MiuMiuImage = {
  link: string;
  label: string;
};

export type MiuMiuPrice = {
  currency: 'EUR';
  value: number;
};

type LoroPianaName = {
  en: string[];
};

export type SearchResultItem = {
  'Brand Size': string[];
  absoluteProductURL: string;
  currencyName: string;
  objectID: string;
  nameEN: string;
  price: number;
  image: string;
};

export type SizeVariant = string[];

type ImageObject = {
  format: 'THUMBNAIL' | 'MEDIUM' | 'LARGE' | 'ZOOM';
  url: string;
};

type ImageContainer = {
  formats: ImageObject[];
};
