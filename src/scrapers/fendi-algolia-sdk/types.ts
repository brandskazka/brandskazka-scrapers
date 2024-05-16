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

export type FendiItem = {
  id: string;
  long_description: string;
  price: Price;
  name: string;
  image_groups: ImageGroup[];
};
