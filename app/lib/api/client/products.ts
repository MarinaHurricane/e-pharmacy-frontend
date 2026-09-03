import { nextServer } from "../api";
import { Category, Product } from "@/app/types/product";

interface getProductsProps {
    page?: number;
    perPage?: number;
    search?: string;
    category?: Category;
}

interface getProductsResponse {
    page: number;
    perPage: number;
    totalProducts: number;
    totalPages: number;
    products: Product[];

}


export const getProducts = async({page, perPage, search, category}: getProductsProps) => {
    const { data} = await nextServer.get<getProductsResponse>('/products', {
        params: {
            page,
            perPage,
            search,
            category,
        }
    })
    return data.products;
}