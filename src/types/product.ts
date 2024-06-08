export interface ratingInfo {
  value: number;
  user: any;
}
export interface reviewInfo {
  review: string;
  user: any;
}

export interface variantInfo {
  name: string;
  images: string[];
  additionalCost: number;
}
export interface productInfo {
  _id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  ratings: ratingInfo[];
  reviews: reviewInfo[];
  category: string;
  variantsCount: number;
  variants: variantInfo[];
}

export interface fileDataProps {
  fileName: string;
  type: string;
  file: File | null;
}
