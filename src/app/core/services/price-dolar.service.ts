import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class PriceDolarService {
    constructor(private _storage: StorageService) {}

    async getPriceDollarFromApi() {
        await this.setPriceDollar(4100000);
    }

    async setPriceDollar(price: number) {
        await this._storage.set('bolivarXDollar', price);
    }

    async getPriceDollar() {
        return await this._storage.get('bolivarXDollar');
    }
}
