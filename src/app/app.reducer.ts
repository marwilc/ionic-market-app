import { ActionReducerMap } from '@ngrx/store';
import * as cart from './tabs/cart/store';

export interface AppState {
    cart: cart.CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
    cart: cart.cartReducer,
};
