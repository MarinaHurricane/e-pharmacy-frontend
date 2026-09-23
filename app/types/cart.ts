import type { Product } from "./product";

export type CartItem = {
  id: string;
//   cartId: string;
  productId: number;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};