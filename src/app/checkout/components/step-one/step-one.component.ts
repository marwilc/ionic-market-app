import {
    AfterViewInit,
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';
import { Address } from '@core/models/address.model';
import {
    ShippingMethod,
    ShippingType,
} from '@core/models/shipping-method.model';
import { StorageService } from '@core/services';
import { ModalController } from '@ionic/angular';
import { AddNewAddressComponent } from 'src/app/my-address/components/add-new-address';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit, AfterViewInit {
    @Output() onComplete = new EventEmitter<any>();

    shippingMethods: ShippingMethod[] = [
        {
            name: 'general.delivery',
            description:
                'general.selectThisOptionIfYouWantUsToShipYourOrder',
            type: ShippingType.DELIVERY,
        },
        {
            name: 'general.pickUp',
            description:
                'general.selectThisOptionIfYouWantToSearchForYourOrder',
            type: ShippingType.PICKUP,
        },
    ];

    selectedMethod: ShippingMethod = this.shippingMethods[0];

    userAddress: Address[] = [];

    pickupAddress: Address[] = [
        {
            id: 3,
            name: 'Retiro en Almacen',
            firstAddress: 'Almacen market, valencia',
            phone: '04124080745',
        },
    ];

    addressSelected: Address;
    shippingTypes = ShippingType;

    constructor(
        private _storage: StorageService,
        private _modal: ModalController
    ) {}

    ngAfterViewInit(): void {
        this._loadAddress();
    }

    ngOnInit() {}

    onChangeShippingMethod(event) {
        this.selectedMethod = event.detail.value;
        if (this.selectedMethod.type === ShippingType.PICKUP) {
            this.addressSelected = this.pickupAddress[0];
        } else {
            this.addressSelected = this.userAddress[0];
        }
    }

    onChangeAddress(event) {
        this.addressSelected = event.detail.value;
    }

    async addNewAddress() {
        const addNewAddressModal = await this._modal.create({
            component: AddNewAddressComponent,
        });

        await addNewAddressModal.present();

        await addNewAddressModal.onWillDismiss();

        await this._loadAddress();
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

        await this._loadAddress();
    }

    useThisAddress() {
        this.onComplete.emit(this.addressSelected);
    }

    private async _loadAddress() {
        const addresses = await this._storage.get('addresses');
        this.userAddress = addresses ? addresses : [];

        if (this.userAddress.length > 0) {
            this.addressSelected = this.userAddress.find(
                (a) => a.preferredAddress
            );
        }
    }
}
