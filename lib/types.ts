export type ProductStock = "inStock" | "outOfStock";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  stock: ProductStock;
  createdAt?: string;
  updatedAt?: string;
}
