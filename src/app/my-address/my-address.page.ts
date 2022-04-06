import { Component, OnInit } from '@angular/core';
import { Address } from '@core/models/address.model';
import { StorageService } from '@core/services';
import { ModalController } from '@ionic/angular';
import { AddNewAddressComponent } from './components/add-new-address';

@Component({
    selector: 'app-my-address',
    templateUrl: './my-address.page.html',
    styleUrls: ['./my-address.page.scss'],
})
export class MyAddressPage implements OnInit {
    addresses: Address[] = [];
    allAddress: Address[] = [];

    constructor(
        private _modal: ModalController,
        private _storage: StorageService
    ) {}

    async ngOnInit() {
        await this._loadAddresses();
    }

    async addNewAddress() {
        const addNewAddressModal = await this._modal.create({
            component: AddNewAddressComponent,
        });

        await addNewAddressModal.present();

        await addNewAddressModal.onWillDismiss();

        await this._loadAddresses();
    }

    async discardAddress(address: Address) {
        this.addresses = this.addresses.filter(
            (a) => a.id !== address.id
        );

        await this._storage.set('addresses', this.addresses);
    }

    async editAddress(address: Address) {
        const addNewAddressModal = await this._modal.create({
            component: AddNewAddressComponent,
            componentProps: {
                address,
            },
        });

        await addNewAddressModal.present();

        await addNewAddressModal.onWillDismiss();

        await this._loadAddresses();
    }

    onSearch(event) {
        const search = event.detail.value.trim().toLowerCase();
        if (search && search !== '' && search.length > 0) {
            this.addresses = this.allAddress.filter(
                (a) =>
                    a.city.toLowerCase().includes(search) ||
                    a.country.toLowerCase().includes(search) ||
                    a.firstAddress.toLowerCase().includes(search) ||
                    a.secondAddress.toLowerCase().includes(search) ||
                    a.zipCode.toLowerCase().includes(search) ||
                    a.state.toLowerCase().includes(search) ||
                    a.phone.toLowerCase().includes(search) ||
                    a.name.toLowerCase().includes(search)
            );
        } else {
            this.addresses = this.allAddress;
        }
    }

    private async _loadAddresses() {
        const address = await this._storage.get('addresses');
        this.addresses = address ? address : [];
        this.allAddress = this.addresses;
    }
}
