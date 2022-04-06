import { Component, OnInit } from '@angular/core';
import {
    FIRST_SECTION,
    KEEP_BUY_PRODUCTS,
} from '@core/mocks/account.mock';
import { ISegment } from '@core/models/mock.model';
import { Product } from '@core/models/product.model';
import { User } from '@core/models/user.model';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
    accountSegments: ISegment[] = [
        {
            id: 1,
            name: 'Tu historial de navegaciòn',
            router: '',
        },
        {
            id: 2,
            name: 'Tarjetas de Regalo',
            router: '',
        },
        {
            id: 3,
            name: 'Subscribe & Save',
            router: '',
        },
        {
            id: 4,
            name: 'Prime',
            router: '',
        },
    ];
    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2,
        spaceBetween: 5,
    };
    slideKeepBuyOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 3,
        spaceBetween: 5,
    };

    user: User = {
        firstName: 'Marwil',
        lastName: 'Campos',
        username: 'marwilc',
        mail: 'jhondoe@gmail.com',
    };

    firstSectionOptions: ISegment[] = FIRST_SECTION;
    keepBuyProducts: Product[] = KEEP_BUY_PRODUCTS;
    giftCardBalance: number = 100;

    constructor() {}

    ngOnInit() {}

    toggleDarkMode() {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        if (prefersDark.matches) {
            document.body.classList.toggle('dark');
        }
    }
}
