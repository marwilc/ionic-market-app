import { Product } from './product.model';

export interface WishList {
    id: number;
    name: string;
    productCover: Product;
    type: string;
}
