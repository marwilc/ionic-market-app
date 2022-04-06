import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from '@core/models/address.model';
import { StorageService } from '@core/services';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-dialog-addresses',
    templateUrl: './dialog-addresses.component.html',
    styleUrls: ['./dialog-addresses.component.scss'],
})
export class DialogAddressesComponent implements OnInit {
    @ViewChild(IonSlides) slideAddress: IonSlides;

    addresses: Address[] = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 5,
    };

    constructor(private _storage: StorageService) {}

    async selectAddress(address: Address) {
        const index = this.addresses.findIndex(
            (a) => a.id === address.id
        );

        this.addresses = this.addresses.map((a) => ({
            ...a,
            preferredAddress: false,
        }));

        this.addresses[index].preferredAddress = true;

        await this._storage.set('addresses', this.addresses);
    }

    async ngOnInit() {
        const addresses = await this._storage.get('addresses');

        this.addresses = addresses ? addresses : [];

        setTimeout(async () => {
            await this.slideAddress.update();
        }, 1);
    }
}
