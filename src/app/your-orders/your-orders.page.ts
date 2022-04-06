import { Component, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { Store } from '@ngrx/store';
import { forkJoin, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setProductsInCart } from '../tabs/cart/store';

@Component({
    selector: 'app-your-orders',
    templateUrl: './your-orders.page.html',
    styleUrls: ['./your-orders.page.scss'],
})
export class YourOrdersPage implements OnInit {
    showSelected: boolean;
    showSelected2: boolean;
    showSelected3: boolean;
    showSelected4: boolean;
    changeIcon: string;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 1.5,
    };

    selectedTypeList: string = 'yourOrders';
    popularNearYouProducts: Product[];
    trendingNearYouProducts: Product[];
    private _subscription = new Subscription();

    constructor(
        private _product: ProductService,
        private _store: Store<AppState>
    ) {
        this.showSelected = false;
        this.showSelected2 = false;
        this.showSelected3 = false;
        this.showSelected4 = false;
    }

    toggleButton() {
        this.showSelected = !this.showSelected;
    }

    toggleButton2() {
        this.showSelected2 = !this.showSelected2;
    }
    toggleButton3() {
        this.showSelected3 = !this.showSelected3;
    }
    toggleButton4() {
        this.showSelected4 = !this.showSelected4;
    }

    ngOnInit() {
        this.fetchInitial();
        this.getsProductsInCart();
    }

    onChangeTypeList(event) {
        this.selectedTypeList = event.detail.value;
    }

    async getsProductsInCart() {
        this._subscription.add(
            (await this._product.getProductsInCart()).subscribe(
                (response) => {
                    if (response.status) {
                        this._store.dispatch(
                            setProductsInCart({
                                products: response.result,
                            })
                        );
                    }
                }
            )
        );
    }

    fetchInitial() {
        const requests = [
            this._product.getPopularNearYou(),
            this._product.getTrendingNearYou(),
        ];
        this._subscription.add(
            forkJoin([...requests]).subscribe(
                async (responses) => {
                    this.popularNearYouProducts = responses[0].result;
                    this.trendingNearYouProducts =
                        responses[1].result;
                },
                async (error) => {}
            )
        );
    }
}
