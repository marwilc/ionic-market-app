import { ISegment } from '@core/models/mock.model';
import { Product } from '@core/models/product.model';

export const FIRST_SECTION: ISegment[] = [
    {
        id: 1,
        name: 'general.yourOrders',
        router: 'your-orders',
    },
    {
        id: 2,
        name: 'general.repurchase',
        router: '#',
    },
    {
        id: 3,
        name: 'general.yourAccount',
        router: 'your-account',
    },
    {
        id: 4,
        name: 'general.yourLists',
        router: 'your-lists',
    },
];

export const KEEP_BUY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Máscara',
        image: 'assets/images/producto-5.png',
        description: '',
        price: 28,
    },
    {
        id: 2,
        name: 'Aspiradora',
        image: 'assets/images/producto-6.png',
        description: '',
        price: 28,
    },
    {
        id: 3,
        name: 'Camas para perros',
        image: 'assets/images/producto-7.png',
        description: '',
        price: 28,
    },
];
