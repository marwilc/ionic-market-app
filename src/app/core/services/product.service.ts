import { Injectable } from '@angular/core';
import {
    DEAL_OF_DAY,
    FEATURE_PRODUCTS,
    MOCK_RESPONSE,
    OFFER_PRODUCTS,
    OTHER_PRODUCTS,
    POPULAR_NEAR_YOU,
    POPULAR_PRODUCTS,
    RELATED_PRODUCTS,
    TRENDING_NEAR_YOU,
} from '@core/mocks/products.mock';
import { ApiResponse } from '@core/models/apiResponse.model';
import { Product } from '@core/models/product.model';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import {
    setProductsInCart,
    unsetProductsInCart,
} from 'src/app/tabs/cart/store';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    productsInCartStorage: Product[] = [];

    constructor(
        private _api: ApiService,
        private _storage: StorageService,
        private _store: Store<AppState>
    ) {}

    async loadProductsInCart() {
        const productsInCart = await this._storage.get(
            'productsInCart'
        );

        this.productsInCartStorage = productsInCart
            ? [...productsInCart]
            : [];
    }

    /**
     * get related products
     *
     * @return {*}  {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getRelatedProducts(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: RELATED_PRODUCTS,
        });
    }

    /**
     * get featured products
     *
     * @return {*}  {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getFeaturedProducts(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: FEATURE_PRODUCTS,
        });
    }

    /**
     * get popular products
     *
     * @return {*}  {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getPopularProducts(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: POPULAR_PRODUCTS,
        });
    }

    /**
     * get deal of day
     *
     * @return {*}  {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getDealOfDay(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: DEAL_OF_DAY,
        });
    }

    /**
     * get recommended products
     *
     * @return {*}  {Observable<ApiResponse>}
     * @memberof ProductService
     */
    getRecommendedProducts(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: OFFER_PRODUCTS,
        });
    }

    /**
     * get other products
     *
     * @return {*}  {Observable<ApiResponse>}
     * @memberof ProductService
     */
    getOtherProducts(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: OTHER_PRODUCTS,
        });
    }

    /**
     * get
     *
     * @param {number} id
     * @return {*}  {Observable<ApiResponse>}
     * @memberof ProductService
     */
    getProduct(id: number): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: OTHER_PRODUCTS.find((p) => p.id === id),
        });
    }

    /**
     * get popular near you
     *
     * @return {*}
     * @memberof ProductService
     */
    getPopularNearYou(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: POPULAR_NEAR_YOU,
        });
    }

    getTrendingNearYou(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: TRENDING_NEAR_YOU,
        });
    }

    /**
     * add product to cart
     *
     * @param {number} id
     * @memberof ProductService
     */
    async addProductToCart(
        id: number
    ): Promise<Observable<ApiResponse>> {
        await this.loadProductsInCart();

        const allProducts = [
            ...POPULAR_NEAR_YOU,
            ...TRENDING_NEAR_YOU,
        ];

        let findProduct = this.productsInCartStorage.find(
            (p) => p.id === id
        );

        if (findProduct) {
            findProduct.quantity++;
        } else {
            findProduct = allProducts.find((p) => p.id === id);

            this.productsInCartStorage.push({
                ...findProduct,
                quantity: 1,
                freeShipping: true,
                available: true,
            });
        }

        await this._storage.set(
            'productsInCart',
            this.productsInCartStorage
        );

        this._store.dispatch(
            setProductsInCart({
                products: this.productsInCartStorage,
            })
        );

        return of({
            ...MOCK_RESPONSE,
            result: findProduct,
        });
    }

    async removeProductFromCart(
        id: number
    ): Promise<Observable<ApiResponse>> {
        await this.loadProductsInCart();

        const findProduct = this.productsInCartStorage.find(
            (p) => p.id === id
        );

        if (findProduct) {
            if (findProduct.quantity > 1) {
                findProduct.quantity--;
            } else {
                this.productsInCartStorage =
                    this.productsInCartStorage.filter(
                        (p) => p.id !== id
                    );
            }
        }

        await this._storage.set(
            'productsInCart',
            this.productsInCartStorage
        );

        this._store.dispatch(
            setProductsInCart({
                products: this.productsInCartStorage,
            })
        );

        return of({
            ...MOCK_RESPONSE,
            result: findProduct,
        });
    }

    async removeCompleteProductFromCart(
        id: number
    ): Promise<Observable<ApiResponse>> {
        await this.loadProductsInCart();

        this.productsInCartStorage =
            this.productsInCartStorage.filter((p) => p.id !== id);

        await this._storage.set(
            'productsInCart',
            this.productsInCartStorage
        );

        this._store.dispatch(
            setProductsInCart({
                products: this.productsInCartStorage,
            })
        );

        return of({
            ...MOCK_RESPONSE,
            result: this.productsInCartStorage,
        });
    }

    async clearCart(): Promise<Observable<ApiResponse>> {
        this.productsInCartStorage = [];

        await this._storage.set(
            'productsInCart',
            this.productsInCartStorage
        );

        this._store.dispatch(unsetProductsInCart());

        return of({
            ...MOCK_RESPONSE,
            result: this.productsInCartStorage,
        });
    }

    async getProductsInCart(): Promise<Observable<ApiResponse>> {
        await this.loadProductsInCart();

        return of({
            ...MOCK_RESPONSE,
            result: this.productsInCartStorage,
        });
    }
}
