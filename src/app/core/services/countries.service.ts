import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, State } from '@core/models/country.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { StorageService } from '.';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    constructor(
        private _http: HttpClient,
        private _storage: StorageService
    ) {}

    getAccessToken() {
        return this._http.get<Country[]>(
            `${environment.countriesApi}/getaccesstoken`,
            {
                headers: {
                    Accept: 'application/json',
                    'api-token': environment.countriesToken,
                    'user-email': environment.userEmail,
                },
            }
        );
    }

    allCountries(token: string): Observable<Country[]> {
        this._storage.set('countries_auth_token', token);

        return this._http.get<Country[]>(
            `${environment.countriesApi}/countries`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        );
    }

    async states(country: string) {
        const token = await this._storage.get('countries_auth_token');

        return this._http.get<State[]>(
            `${environment.countriesApi}/states/${country}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        );
    }
}
