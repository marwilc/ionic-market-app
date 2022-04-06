import { Component, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
    selector: 'app-empty-cart',
    templateUrl: './empty-cart.component.html',
    styleUrls: ['./empty-cart.component.scss'],
})
export class EmptyCartComponent implements OnInit {
    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 20,
    };

    popularNearYouProducts: Product[] = [];
    trendingNearYouProducts: Product[] = [];
    private _subscription = new Subscription();

    constructor(private _product: ProductService) {}

    ngOnInit() {
        this.fetchInitial();
    }

    ionViewWillEnter() {
        this._subscription = new Subscription();
    }

    ionViewWillLeave() {
        this._subscription.unsubscribe();
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
