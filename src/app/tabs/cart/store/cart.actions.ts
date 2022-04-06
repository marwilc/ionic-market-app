import { Product } from '@core/models/product.model';
import { createAction, props } from '@ngrx/store';

export const setProductsInCart = createAction(
    '[cart] setProductsInCart',
    props<{ products: Product[] }>()
);

export const unsetProductsInCart = createAction(
    '[cart] unsetProductsInCart'
);

export const addProductToCart = createAction(
    '[cart] addProductToCart',
    props<{ product: Product }>()
);

export const removeProductFromCart = createAction(
    '[cart] removeProductFromCart',
    props<{ id: number }>()
);
