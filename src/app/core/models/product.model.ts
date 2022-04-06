import { ApiResponse } from './apiResponse.model';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity?: number;
    freeShipping?: boolean;
    shippingTime?: string;
    available?: boolean;
}
export interface ProductOffer extends Product {
    ends: string;
    discountPrice: number;
}

export interface ProductResponse extends ApiResponse {
    result: any;
}
