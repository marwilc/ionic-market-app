import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Injectable({
    providedIn: 'root',
})
export class CheckoutGuard implements CanLoad {
    constructor(
        private _store: Store<AppState>,
        private _nav: NavController
    ) {}

    canLoad() {
        return this._store.select('cart').pipe(
            switchMap(({ productsInCart }) => {
                if (productsInCart.length > 0) {
                    return of(true);
                } else {
                    this._nav.back();
                    of(false);
                }
            }),
            catchError(() => {
                this._nav.back();
                return of(false);
            })
        );
    }
}
