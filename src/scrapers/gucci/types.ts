type ImageGroup = {
  images: Image[];
};

export type Image = {
  dis_base_link: string;
  alt: string;
};

export type Price = {
  EUR: number;
};

export type GucciItem = {
  id: string;
  imgUrl: string;
  genders_en_gb: string[];
  thumbnailUrl: string;
  name_en_gb: string;
  allCategories_en_gb: string[];
  primaryImageData: {
    format: string;
  };
  objectID: string;
  pdpUrl: string;
  price_eur: number;
};
