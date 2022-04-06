import { ApiResponse } from '@core/models/apiResponse.model';
import { Product, ProductOffer } from '@core/models/product.model';

export const MOCK_RESPONSE: ApiResponse = {
    result: '',
    status: true,
    code: 200,
    message: 'Success',
};
export const RELATED_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Aspiradora de mano',
        price: 10,
        description: 'Description 1',
        image: 'assets/images/articulo-2.png',
    },
    {
        id: 2,
        name: 'Aspiradora de mano',
        price: 20,
        description: 'Description 2',
        image: 'assets/images/articulo-2.png',
    },
    {
        id: 3,
        name: 'Aspiradora de mano',
        price: 30,
        description: 'Description 3',
        image: 'assets/images/articulo-3.png',
    },
    {
        id: 4,
        name: 'Aspiradora de mano',
        price: 40,
        description: 'Description 4',
        image: 'assets/images/articulo-4.png',
    },
];

export const FEATURE_PRODUCTS: Product[] = [
    {
        id: 1,
        image: 'assets/images/slide-2.jpg',
        // eslint-disable-next-line @typescript-eslint/quotes
        name: `Keep close to Nature's heart`,
        price: 18.99,
        description: '',
    },
    {
        id: 2,
        image: 'assets/images/slide-3.jpg',
        // eslint-disable-next-line @typescript-eslint/quotes
        name: `Keep close to Nature's heart`,
        price: 18.99,
        description: '',
    },
    {
        id: 3,
        image: 'assets/images/slide-4.jpg',
        // eslint-disable-next-line @typescript-eslint/quotes
        name: `Keep close to Nature's heart`,
        price: 18.99,
        description: '',
    },
    {
        id: 4,
        image: 'assets/images/slide-5.jpg',
        // eslint-disable-next-line @typescript-eslint/quotes
        name: `Keep close to Nature's heart`,
        price: 18.99,
        description: '',
    },
    {
        id: 5,
        image: 'assets/images/slide-6.jpg',
        // eslint-disable-next-line @typescript-eslint/quotes
        name: `Keep close to Nature's heart`,
        price: 18.99,
        description: '',
    },
];

export const DEAL_OF_DAY: ProductOffer = {
    id: 1,
    image: 'assets/images/articulo-1.jpg',
    name: 'Ahorra en NURSAL y más',
    price: 29.99,
    discountPrice: 9.59,
    ends: '12:30:04',
    description: '',
};

export const POPULAR_PRODUCTS: Product[] = [
    {
        id: 6,
        image: 'assets/images/articulo-6.png',
        description: '',
        price: 29.9,
        name: 'Aspiradora de mano',
    },
    {
        id: 7,
        image: 'assets/images/articulo-7.png',
        description: '',
        price: 29.9,
        name: 'Aspiradora de mano',
    },
    {
        id: 8,
        image: 'assets/images/articulo-8.png',
        description: '',
        price: 29.9,
        name: 'Aspiradora de mano',
    },
    {
        id: 9,
        image: 'assets/images/articulo-9.png',
        description: '',
        price: 29.9,
        name: 'Aspiradora de mano',
    },
];

export const OFFER_PRODUCTS: ProductOffer[] = [
    {
        id: 5,
        image: 'assets/images/articulo-5.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
        ends: '',
        discountPrice: 19.71,
    },
    {
        id: 7,
        image: 'assets/images/articulo-7.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
        ends: '',
        discountPrice: 19.71,
    },
    {
        id: 8,
        image: 'assets/images/articulo-8.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
        ends: '',
        discountPrice: 19.71,
    },
];

export const OTHER_PRODUCTS: Product[] = [
    {
        id: 8,
        image: 'assets/images/articulo-6.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
    },
    {
        id: 8,
        image: 'assets/images/articulo-7.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
    },
    {
        id: 8,
        image: 'assets/images/articulo-8.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
    },
    {
        id: 8,
        image: 'assets/images/articulo-9.png',
        description: '',
        price: 42.99,
        name: 'Aspiradora de mano Cherylon',
    },
];

export const POPULAR_NEAR_YOU: Product[] = [
    {
        id: 1,
        image: 'assets/images/add-carrito-1.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 2,
        image: 'assets/images/add-carrito-2.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 3,
        image: 'assets/images/add-carrito-3.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 4,
        image: 'assets/images/add-carrito-4.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 5,
        image: 'assets/images/add-carrito-5.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 6,
        image: 'assets/images/add-carrito-6.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 7,
        image: 'assets/images/add-carrito-7.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 8,
        image: 'assets/images/add-carrito-8.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 9,
        image: 'assets/images/add-carrito-9.png',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
];

export const TRENDING_NEAR_YOU: Product[] = [
    {
        id: 10,
        image: 'assets/images/libro-1.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 11,
        image: 'assets/images/libro-2.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 12,
        image: 'assets/images/libro-3.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 13,
        image: 'assets/images/libro-4.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 14,
        image: 'assets/images/libro-5.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 15,
        image: 'assets/images/libro-6.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 16,
        image: 'assets/images/libro-7.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 17,
        image: 'assets/images/libro-8.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
    {
        id: 18,
        image: 'assets/images/libro-9.jpg',
        description: '',
        price: 42.99,
        name: 'Lorem ipsum dolor sit',
    },
];
