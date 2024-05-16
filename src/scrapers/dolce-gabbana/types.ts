type SearchResultImage = {
  images: Array<{ dis_base_link: string; alt: string }>;
};

export type Price = {
  value: number;
};

type SearchResultSize = {
  clothingSize: string;
  size: string;
};

export type ListPrice = {
  listPrice: number;
};

export type SearchResultPrice = {
  'ONAZ-EUR': ListPrice;
  'ONIT-EUR': ListPrice;
  'ONCL-EUR': ListPrice;
  'ONCO-EUR': ListPrice;
  'ONKZ-EUR': ListPrice;
  'ONLB-EUR': ListPrice;
  'ONMY-EUR': ListPrice;
  'ONRU-EUR': ListPrice;
  'ONTH-EUR': ListPrice;
  'ONTR-EUR': ListPrice;
  'ONTW-EUR': ListPrice;
  'ONZA-EUR': ListPrice;
};

export type SearchResultItem = {
  id: string;
  name: string;
  image_groups: SearchResultImage[];
  short_description: string;
  available_sizes: SearchResultSize[];
  price: SearchResultPrice;
};

export type Variant = {
  price: number;
  variationValues: {
    size: string;
  };
};

type VariantValue = {
  value: string;
};

export type SingleItem = {
  imageGroups: Array<{
    images: Array<{
      disBaseLink: string;
    }>;
  }>;
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  variationAttributes: Array<{
    id: 'size';
    values: VariantValue[];
  }>;
};
