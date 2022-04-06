import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { appRoutes } from '@config/app.config';
import { PriceDolarService, StorageService } from '@core/services';
import { CountriesService } from '@core/services/countries.service';
import { TranslationsService } from '@core/services/translation.service';
import { NavController, Platform } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private _translate: TranslationsService,
        private _platform: Platform,
        private _priceDollar: PriceDolarService,
        private _nav: NavController,
        private _router: Router,
        private _countries: CountriesService,
        private _storage: StorageService
    ) {}
    async ngOnInit(): Promise<void> {
        await this._priceDollar.getPriceDollarFromApi();
        this._translate.initLanguage();
        if (this._platform.is('capacitor')) {
            await StatusBar.setBackgroundColor({ color: '31ac26' });
        }

        this._platform.backButton.subscribeWithPriority(1, () => {
            if (this._router.url === `/tabs/${appRoutes.home}`) {
                navigator['app'].exitApp();
            } else {
                this._nav.back();
            }
        });

        this._countries
            .getAccessToken()
            .pipe(
                switchMap((response) =>
                    this._countries.allCountries(
                        response['auth_token']
                    )
                )
            )
            .subscribe(async (response) => {
                await this._storage.set('countries', response);
            });
    }
}
