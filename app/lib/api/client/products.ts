import { nextServer } from '../api';
import { Product } from '@/app/types/product';

export interface getProductsProps {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string | null;
}

export interface getProductsResponse {
  page: number;
  perPage: number;
  totalProducts: number;
  totalPages: number;
  products: Product[];
}

export const getProducts = async ({
  page,
  perPage,
  search,
  category,
}: getProductsProps) => {
  const { data } = await nextServer.get<getProductsResponse>('/products', {
    params: {
      page,
      perPage,
      search,
      category,
    },
  });
  return data;
};

export const getCategories = async () => {
  const { data } = await nextServer.get('/products/categories');
  return data;
};

export const getProductById = async(productId: number) => {
  const {data} = await nextServer.get(`/products/${productId}`);
  return data;
};

export const getProductReviews = async(productId: number) => {
  const {data} = await nextServer.get(`/products/${productId}/reviews`);
  return data;
}