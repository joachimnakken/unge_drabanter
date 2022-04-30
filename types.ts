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
export interface RatedProductDocument extends VinmonopoletProductWithImage {
  id: string;
  ratedById: string;
  ratedFromGroup: string;
  rating: number;
}

export interface UserDataInterface {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}
