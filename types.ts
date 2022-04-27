export interface VinmonopoletProduct {
  basic: {
    productId: string;
    productShortName: string;
  };
  lastChanged: {
    date: string;
    time: string;
  };
}

export interface VinmonopoletProductWithImage extends VinmonopoletProduct {
  imageUrl: string;
}
