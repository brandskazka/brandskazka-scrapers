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
  name_en_gb: string;
  objectID: string;
  pdpUrl: string;
  price_eur: number;
};
