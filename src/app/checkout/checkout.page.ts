import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { appInfo } from '@config/app.config';
import { Address } from '@core/models/address.model';
import { Billing } from '@core/models/billing.model';
import { Product } from '@core/models/product.model';
import { ShippingTime } from '@core/models/shipping-method.model';
import { PriceDolarService } from '@core/services';
import { ProductService } from '@core/services/product.service';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setProductsInCart } from '../tabs/cart/store';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnDestroy {
    @ViewChild('panelStepTwo') panelStepTwo: MatExpansionPanel;
    @ViewChild('panelStepThree') panelStepThree: MatExpansionPanel;
    @ViewChild('panelStepFour') panelStepFour: MatExpansionPanel;

    shippingAddress: Address;
    shippingTime: ShippingTime;
    billing: Billing;
    payment;

    subTotal: number = 0;
    bolivarXDollar: number = 0;
    iva: number = 0;
    tip: number = 0;
    shipping: number = 0;

    productsInCart: Product[] = [];
    vesCurrency: string = appInfo.bsCurrencySymbol;
    ivaConfig: number = appInfo.iva;

    private _subscription = new Subscription();

    constructor(
        private _store: Store<AppState>,
        private _product: ProductService,
        private _dollarPrice: PriceDolarService,
        private _router: Router,
        private _navController: NavController
    ) {}

    get total() {
        return this.subTotal + this.iva + this.shipping + this.tip;
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    async ngOnInit() {
        this._addSubscription();
        this.getProductsInCart();

        this.bolivarXDollar = Number(
            await this._dollarPrice.getPriceDollar()
        );

        this.panelStepTwo.disabled = true;
        this.panelStepThree.disabled = true;
        this.panelStepFour.disabled = true;
    }

    ionViewWillLeave() {}

    onCompleteStepOne(address: Address) {
        this.shippingAddress = address;
        this.panelStepTwo.open();
        this.panelStepTwo.disabled = false;
    }

    onCompleteStepTwo(shippingTime: ShippingTime) {
        this.shippingTime = shippingTime;
        this.shipping = this.shippingTime.price;
        this.tip = this.shippingTime.tip;
        this.panelStepThree.open();
        this.panelStepThree.disabled = false;
    }

    onCompleteStepThree(billing: Billing) {
        this.billing = billing;
        this.panelStepFour.open();
        this.panelStepFour.disabled = false;
    }

    onCompleteStepFour(payment) {
        this.payment = payment;
        this.panelStepFour.close();
    }

    async finishPurchase() {
        if (
            this.payment &&
            this.billing &&
            this.shippingTime &&
            this.shippingAddress
        ) {
            // to go orders

            await this._product.clearCart();
            await this._router.navigate(
                ['/', 'tabs', 'account', 'your-orders'],
                { replaceUrl: true }
            );
        }
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

    private _addSubscription() {
        this._subscription.add(
            this._store
                .select('cart')
                .subscribe(({ productsInCart }) => {
                    this.subTotal = 0;
                    this.productsInCart = productsInCart;

                    this.productsInCart.forEach((p) => {
                        this.subTotal += p.price * p.quantity;
                    });

                    this.iva = this.subTotal * this.ivaConfig;
                })
        );
    }
}
