import { Product } from "./Product";

export interface ResponseOrder 
{
    productId: number;
    status: string;
    shippingAddress: string;
    addressId: number; 
    product: Product[];
}