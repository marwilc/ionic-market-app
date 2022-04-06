import { WishList } from '@core/models/wish-list.model';
import { PRODUCTS_IN_CART } from './cart.mock';

export const YOUR_WISHLISTS: WishList[] = [
    {
        id: 1,
        name: 'Mi lista de compras',
        productCover: PRODUCTS_IN_CART[0],
        type: 'Private',
    },
];
