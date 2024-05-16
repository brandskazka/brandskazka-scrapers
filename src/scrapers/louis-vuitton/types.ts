interface Link {
  href: string;
}

interface LouisVuittonProduct {
  productVisible: boolean;
  macroColor: string;
  _links: {
    look: Link;
    parent: Link;
    self: Link;
    'perso-details': Link;
    '/api/rels/fra-fr/add-to-cart-base/nvprod4940283v/1': {
      name: string;
      href: string;
    };
  };
  '@type': string;
  identifierKey: string;
  commercialTag: string;
  productDetailTabs: any[]; // You can specify the correct type here if known
  name: string;
  packagingVariation: string;
  offers: {
    priceSpecification: {
      priceCurrency: string;
      price: number;
    };
    '@type': string;
    price: string;
  };
  disambiguatingDescription: string;
  image: {
    contentUrl: string;
    '@type': string;
    name: string;
    '@context': string;
  }[];
  url: string;
  highEndTemplate: boolean;
  sizeDisplayName: string;
  productId: string;
  hasLanguagePanel: boolean;
  additionalProperty: {
    '@type': string;
    name: string;
    value: string | boolean; // Assuming value can be string or boolean
  }[];
  category: {
    '@type': string;
    url: string;
    alternateName: string;
    name: string;
    identifier: string;
  }[];
  careLink: {
    sections: any[]; // You can specify the correct type here if known
  };
  disclaimers: {
    customDisclaimer: boolean;
    value: string;
    popInContent: string;
    popInTitle: string;
  };
  collectibles: boolean;
  color: string;
  '@context': string;
  identifier: string;
  defaultFamilySapDisplayName: string;
  backInStock: boolean;
  buyOnWebSiteOnly: boolean;
  callUsEnabled: boolean;
  showARModel: boolean;
  hideAddToWishlist: boolean;
  productBackground: string;
  assets: any[]; // You can specify the correct type here if known
}

interface PanelInformation {
  '@type': string;
  title: string;
  description: string;
  introduction: string;
}

interface AdditionalProperty {
  '@type': string;
  name: string;
  value: string | boolean;
}

interface Link {
  href: string;
}

interface Category {
  '@type': string;
  url: string;
  alternateName: string;
  name: string;
  identifier: string;
}

interface AdditionalProperty2 {
  '@type': string;
  name: string;
  value: boolean;
}

interface LouisVuittonProductResponse {
  model: LouisVuittonProduct[];
  panelInformations: PanelInformation[];
  _links: {
    self: Link;
    push: Link;
    'care-link': Link;
    'size-guide': Link;
    availability: Link;
  };
  '@type': string;
  sku: string;
  isSimilarTo: any[]; // You can specify the correct type here if known
  productTips: any[]; // You can specify the correct type here if known
  url: string;
  category: Category[];
  additionalProperty: AdditionalProperty[];
  name: string;
  isRelatedTo: any[]; // You can specify the correct type here if known
  identifier: string;
  backInStock: boolean;
  buyOnWebSiteOnly: boolean;
  callUsEnabled: boolean;
  showARModel: boolean;
  hideAddToWishlist: boolean;
  productBackground: string;
}

interface LouisVuittonSearchResultItem {
  productId: string;
  identifier: string; // sku
  image: Array<{ contentUrl: string }>;
  name: string;
  size: string;
  url: string;
  offers: {
    priceSpecification: Array<{
      price: string;
    }>;
  };
}
