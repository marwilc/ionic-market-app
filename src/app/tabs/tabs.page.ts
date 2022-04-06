import { Component, OnDestroy, OnInit } from '@angular/core';
import { appRoutes } from '@config/app.config';
import { TABS } from '@core/mocks/tabs.mock';
import { ITab } from '@core/models/mock.model';
import { Product } from '@core/models/product.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
    tabs: ITab[] = TABS;

    productsInCart: Product[] = [];
    private _subscription = new Subscription();
    constructor(private _store: Store<AppState>) {}
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngOnInit() {
        this._subscription.add(
            this._store
                .select('cart')
                .subscribe(({ productsInCart }) => {
                    this.productsInCart = productsInCart;
                    const tabCart = this.tabs.find(
                        (t) => t.name === appRoutes.cart
                    );

                    tabCart.badge = this.productsInCart.reduce(
                        (i, p) => p.quantity + i,
                        0
                    );
                })
        );
    }
}
