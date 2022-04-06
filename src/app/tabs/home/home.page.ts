import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { StatusFetching } from '@core/enums/status-fetching.enum';
import { HOME_SEGMENTS } from '@core/mocks/segments-home.mock';
import { HOME_MAIN_SLIDES } from '@core/mocks/slides-home.mock';
import { Department } from '@core/models/departament.model';
import { ISegment, ISlide } from '@core/models/mock.model';
import { Product, ProductOffer } from '@core/models/product.model';
import { User } from '@core/models/user.model';
import { DepartmentService } from '@core/services/department.service';
import { ProductService } from '@core/services/product.service';
import { IonRefresher, IonSlides } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { forkJoin, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { setProductsInCart } from '../cart/store';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    @ViewChild('mainSlides') mainSlides: IonSlides;
    @ViewChild(IonRefresher) refresher: IonRefresher;
    image: string = 'assets/images/the_tomorrow_war.jpg';
    homeSegments: ISegment[] = HOME_SEGMENTS;
    mainSlidesItems: ISlide[] = HOME_MAIN_SLIDES;
    featureProducts: Product[] = [];
    relatedProducts: Product[] = [];
    dealOfDay: ProductOffer = null;
    popularProducts: Product[] = [];
    recommendedProducts: ProductOffer[] = [];
    otherProducts: Product[] = [];
    departMents: Department[] = [];

    popularNearYouProducts: Product[] = [];
    trendingNearYouProducts: Product[] = [];

    user: User = {
        firstName: 'Marwil',
        lastName: 'Campos',
        username: 'marwilc',
        mail: 'jhondoe@gmail.com',
    };
    mainSlidesOpts = {
        initialSlide: 0,
        speed: 400,
    };
    featureSlidesOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 0,
    };

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 10,
    };

    statusHome: StatusFetching = StatusFetching.FETCHING;
    statusFetching = StatusFetching;

    private _subscription = new Subscription();
    constructor(
        private _product: ProductService,
        private _department: DepartmentService,
        private _store: Store<AppState>
    ) {}
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
    ngOnInit() {
        this.fetchInitial();
    }

    ionViewWillEnter() {
        this._subscription = new Subscription();

        this.getsProductsInCart();
    }

    ionViewWillLeave() {
        this._subscription.unsubscribe();
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

    segmentChanged($event) {
        console.log($event);
    }

    /**
     * fetch initial data
     *
     * @memberof HomePage
     */
    fetchInitial() {
        const requests = [
            this._product.getFeaturedProducts(),
            this._product.getRelatedProducts(),
            this._product.getDealOfDay(),
            this._product.getPopularProducts(),
            this._product.getRecommendedProducts(),
            this._product.getOtherProducts(),
            this._department.getDepartments(),
            this._product.getPopularNearYou(),
            this._product.getTrendingNearYou(),
        ];
        this.statusHome = StatusFetching.FETCHING;
        this._subscription.add(
            forkJoin([...requests])
                .pipe(delay(300))
                .subscribe(
                    async (responses) => {
                        this.featureProducts = responses[0].result;
                        this.relatedProducts = responses[1].result;
                        this.dealOfDay = responses[2].result;
                        this.popularProducts = responses[3].result;
                        this.recommendedProducts =
                            responses[4].result;
                        this.otherProducts = responses[5].result;
                        this.departMents = responses[6].result;
                        this.popularNearYouProducts =
                            responses[7].result;
                        this.trendingNearYouProducts =
                            responses[8].result;

                        this.statusHome = StatusFetching.FETCHED;

                        setTimeout(async () => {
                            await this.mainSlides.startAutoplay();
                        }, 300);
                        this.stopRefresh();
                    },
                    async (error) => {
                        this.statusHome = StatusFetching.FAILED;

                        this.stopRefresh();
                    }
                )
        );
    }

    async stopRefresh() {
        if (this.refresher) {
            await this.refresher.complete();
        }
    }
}
