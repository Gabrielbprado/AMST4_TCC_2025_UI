import { Image } from './Image';
export interface Product
{
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    images: Image[];
}