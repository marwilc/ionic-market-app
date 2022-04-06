import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    POPULAR_NEAR_YOU,
    TRENDING_NEAR_YOU,
} from '@core/mocks/products.mock';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
    slideOpts = {
        initialSlide: 0,
        speed: 400,
    };
    slideOpts2 = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 20,
    };

    allProducts = [...POPULAR_NEAR_YOU, ...TRENDING_NEAR_YOU];
    productId: number;
    product: Product;

    private _subs = new Subscription();

    constructor(
        private _activateRouting: ActivatedRoute,
        private _products: ProductService,
        private _router: Router
    ) {}

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    async buyNow() {
        this._subs.add(
            (
                await this._products.addProductToCart(this.product.id)
            ).subscribe((response) => {
                if (response.status) {
                    // product added
                    this._router.navigate(['/tabs/cart']);
                }
            })
        );
    }

    async addToCart() {
        this._subs.add(
            (
                await this._products.addProductToCart(this.product.id)
            ).subscribe((response) => {
                if (response.status) {
                    // product added
                }
            })
        );
    }

    ngOnInit() {
        this._subs.add(
            this._activateRouting.params.subscribe((response) => {
                this.productId = Number(response.id);

                this.product = this.allProducts.find(
                    (p) => p.id === this.productId
                );
            })
        );
    }
}
