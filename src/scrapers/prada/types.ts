export type MiuMiuImage = {
    link: string;
    label: string;
}

export type MiuMiuPrice = {
    currency: "EUR";
    value: number;
}

export type MiuMiuItem = {
    Id: string;
    Availability: number;
    Color: string;
    Description: string;
    Gender: string[];
    Link: string;
    Images: MiuMiuImage[];
    Price: MiuMiuPrice;
    Brand: string;
    Title: string;
}

export type MiuMiuSearchResponseItem = {
    hitsPerPage: number;
    hits: MiuMiuItem[];
    nbHits: number;
    nbPages: number;
    page: number;
}

export type MiuMiuSearchResponse = {
    results: MiuMiuSearchResponseItem[];
}


export type MiuMiuProduct = {
    longdescription: string;
    name: string;
    sizeCodes: { value: string; identifier: string; }[];
    price: {
        value: string;
    }[];
    attachments: {
        attachmentAssetPath: string;
    }[];
}