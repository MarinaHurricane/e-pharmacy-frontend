import { cookies } from "next/headers";
import { nextServer } from "../api";
import { getProductsProps, getProductsResponse } from "../client/products";
import { serverApi } from "./serverApi";

export const getServerProducts = async ({
  page,
  perPage,
  search,
  category,
}: getProductsProps) => {
     const cookieStore = await cookies();
  const { data } = await serverApi.get<getProductsResponse>('/products', {
    params: {
      page,
      perPage,
      search,
      category,
    },
        headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerCategories = async () => {
     const cookieStore = await cookies();
  const { data } = await serverApi.get('/products/categories', {
        headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
