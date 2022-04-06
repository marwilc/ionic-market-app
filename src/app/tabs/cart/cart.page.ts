import { Component, OnInit } from '@angular/core';
import { CART_SEGMENTS } from '@core/mocks/segments-cart.mock';
import { ISegment } from '@core/models/mock.model';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { setProductsInCart } from './store';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cartSegments: ISegment[] = CART_SEGMENTS;
    buttonCheckoutIntersect: boolean = false;
    subtotal: number = 0;
    productsInCart: Product[] = [];

    messageMapping: { [k: string]: string } = {
        '=0': 'general.product',
        '=1': 'general.product',
        other: 'general.products',
    };

    nProductsInCart: number = 0;
    private _subscription: Subscription;

    constructor(
        private _store: Store<AppState>,
        private _product: ProductService
    ) {}

    ngOnInit() {}

    ionViewWillEnter() {
        this._subscription = new Subscription();

        this._addSubscriptions();
        this.getProductsInCart();
    }

    ionViewWillLeave() {
        this._subscription.unsubscribe();
    }

    /**
     * get products in cart
     *
     * @memberof CartPage
     */
    async getProductsInCart() {
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

    async incrementQuantity(product: Product) {
        this._subscription.add(
            (
                await this._product.addProductToCart(product.id)
            ).subscribe((response) => {
                if (response.status) {
                    // toast
                }
            })
        );
    }

    async decrementQuantity(product: Product) {
        this._subscription.add(
            (
                await this._product.removeProductFromCart(product.id)
            ).subscribe((response) => {
                if (response.status) {
                    // toast
                }
            })
        );
    }

    async removeCompleteProductFromCart(product: Product) {
        this._subscription.add(
            (
                await this._product.removeCompleteProductFromCart(
                    product.id
                )
            ).subscribe((response) => {
                if (response.status) {
                    // toast
                }
            })
        );
    }

    private _addSubscriptions() {
        this._subscription.add(
            this._store
                .select('cart')
                .subscribe(({ productsInCart }) => {
                    this.subtotal = 0;
                    this.productsInCart = productsInCart;
                    this.nProductsInCart = this.productsInCart.reduce(
                        (i, p) => p.quantity + i,
                        0
                    );

                    this.subtotal = this.productsInCart.reduce(
                        (i, p) => p.quantity * p.price + i,
                        0
                    );

                    if (this.productsInCart.length > 0) {
                        setTimeout(() => {
                            const observer = new IntersectionObserver(
                                (entries) => {
                                    if (entries[0].isIntersecting) {
                                        this.buttonCheckoutIntersect =
                                            false;
                                    } else {
                                        this.buttonCheckoutIntersect =
                                            true;
                                    }
                                }
                            );

                            observer.observe(
                                document.querySelector('.watch')
                            );
                        }, 2);
                    }
                })
        );
    }
}
