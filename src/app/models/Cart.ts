import { Product } from "./Product";

export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
}


export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}