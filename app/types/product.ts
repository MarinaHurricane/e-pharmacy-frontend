export interface Category {
    category: string;
}

export interface Product {
    id: number;
    photo: string;
    name: string;
    suppliers: string[];
    stock: number;
    price: number;
    category: string;
}

