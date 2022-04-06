import { Product } from '@core/models/product.model';
import { createReducer, on } from '@ngrx/store';
import {
    addProductToCart,
    removeProductFromCart,
    setProductsInCart,
    unsetProductsInCart,
} from './cart.actions';

export interface CartState {
    productsInCart: Product[];
}

export const initialState: CartState = {
    productsInCart: [],
};

const _cartReducer = createReducer(
    initialState,
    on(setProductsInCart, (state, action) => ({
        ...state,
        productsInCart: [...action.products],
    })),
    on(unsetProductsInCart, (state) => ({
        ...state,
        productsInCart: [],
    })),
    on(addProductToCart, (state, action) => ({
        ...state,
        productsInCart: [
            ...state.productsInCart,
            { ...action.product },
        ],
    })),
    on(removeProductFromCart, (state, action) => ({
        ...state,
        productsInCart: state.productsInCart.filter(
            (p) => p.id !== action.id
        ),
    }))
);

export function cartReducer(state, action) {
    return _cartReducer(state, action);
}
