import { AfterViewInit, Component } from '@angular/core';
import { Address } from '@core/models/address.model';
import { StorageService } from '@core/services';
import { ModalController } from '@ionic/angular';
import { DialogAddressesComponent } from '../dialog-addresses';

@Component({
    selector: 'app-location-header',
    templateUrl: './location-header.component.html',
    styleUrls: ['./location-header.component.scss'],
})
export class LocationHeaderComponent implements AfterViewInit {
    addresses: Address[] = [];
    address: Address = null;

    constructor(
        private _modal: ModalController,
        private _storage: StorageService
    ) {}

    async ngAfterViewInit(): Promise<void> {
        await this._loadAddress();
    }

    async showAddressDialog() {
        const addressesModal = await this._modal.create({
            component: DialogAddressesComponent,
            cssClass: 'action-sheet-50',
        });

        await addressesModal.present();

        const { data } = await addressesModal.onWillDismiss();

        await this._loadAddress();
    }

    private async _loadAddress() {
        const addresses = await this._storage.get('addresses');
        this.addresses = addresses ? addresses : [];

        if (this.addresses.length > 0) {
            this.address = this.addresses.find(
                (a) => a.preferredAddress
            );
        }
    }
}
