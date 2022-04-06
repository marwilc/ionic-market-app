import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
    selector: 'app-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
    @Input() products: Product[];
    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 10,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.5,
                spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            800: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 10,
                spaceBetween: 10,
            },
        },
    };

    productsInCart: Product[] = [];
    private _subscription = new Subscription();

    constructor(
        private _store: Store<AppState>,
        private _product: ProductService,
        private _pipeTranslate: TranslatePipe
    ) {}

    quantity(product: Product): string {
        const productInCart = this.productsInCart.find(
            (p) => p.id === product.id
        );

        return productInCart
            ? `${
                  productInCart.quantity
              } ${this._pipeTranslate.transform('general.inTheCart')}`
            : '';
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngOnInit() {
        this._addSubscriptions();
    }

    /**
     * add to cart product
     *
     * @param {Product} product
     * @memberof ProductCarouselComponent
     */
    async addToCart(product: Product) {
        this._subscription.add(
            (
                await this._product.addProductToCart(product.id)
            ).subscribe((response) => {
                if (response.status) {
                    // product added
                }
            })
        );
    }

    private _addSubscriptions() {
        this._subscription.add(
            this._store
                .select('cart')
                .subscribe(({ productsInCart }) => {
                    this.productsInCart = productsInCart;
                })
        );
    }
}
