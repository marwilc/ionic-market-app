import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '@core/models/address.model';
import { Country, State } from '@core/models/country.model';
import { StorageService } from '@core/services';
import { CountriesService } from '@core/services/countries.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-new-address',
    templateUrl: './add-new-address.component.html',
    styleUrls: ['./add-new-address.component.scss'],
})
export class AddNewAddressComponent implements OnInit, OnDestroy {
    @Input() address: Address;

    newAddressForm: FormGroup = this._createAddressForm();
    attempt: boolean = false;

    countries: Country[] = [];
    countryDefault: Country;
    stateDefault: State;
    states: State[] = [];
    addresses: Address[] = [];
    private _subs = new Subscription();

    constructor(
        private _modal: ModalController,
        private _fb: FormBuilder,
        private _storage: StorageService,
        private _country: CountriesService
    ) {}

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    ngOnInit() {
        if (this.address) {
            this._patchValues();
        }

        this._addSubs();
    }

    async close() {
        await this._modal.dismiss();
    }

    async onSubmit() {
        this.newAddressForm.markAllAsTouched();

        if (this.newAddressForm.invalid || this.attempt) {
            return;
        }

        const {
            country,
            name,
            phone,
            firstAddress,
            secondAddress,
            city,
            state,
            zipCode,
            preferredAddress,
        } = this.newAddressForm.value;

        const id = Date.now();
        if (preferredAddress) {
            this.addresses.map((a) => ({
                ...a,
                preferredAddress: false,
            }));
        }
        if (this.address) {
            const index = this.addresses.findIndex(
                (a) => a.id === this.address.id
            );

            this.addresses[index] = {
                id: this.addresses[index].id,
                country,
                name,
                phone,
                firstAddress,
                secondAddress,
                city,
                state,
                zipCode,
                preferredAddress,
            };
        } else {
            this.addresses.push({
                id,
                country,
                name,
                phone,
                firstAddress,
                secondAddress,
                city,
                state,
                zipCode,
                preferredAddress,
            });
        }

        const almostPreferred = this.addresses.filter(
            (a) => a.preferredAddress
        );

        if (almostPreferred.length === 0) {
            this.addresses[0].preferredAddress = true;
        }

        await this._storage.set('addresses', this.addresses);
        this.close();
    }

    async onCountryChange(event: any) {
        const request = await this._country.states(
            event.detail.value
        );
        this._subs.add(
            request.subscribe((response) => {
                this.states = response;

                this.stateDefault = this.states.find(
                    (c) => c.state_name === 'Carabobo'
                );

                this.newAddressForm
                    .get('state')
                    .setValue(this.stateDefault?.state_name || '');
            })
        );
    }

    private _createAddressForm(): FormGroup {
        return this._fb.group({
            country: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            firstAddress: ['', Validators.required],
            secondAddress: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            preferredAddress: false,
        });
    }

    private async _addSubs() {
        this.countries = await this._storage.get('countries');

        const address = await this._storage.get('addresses');
        this.addresses = address ? address : [];

        if (this.countries && this.countries.length > 0) {
            this.countryDefault = this.countries.find(
                (c) => c.country_name === 'Venezuela'
            );

            await this.onCountryChange({
                detail: { value: this.countryDefault.country_name },
            });

            this.newAddressForm
                .get('country')
                .setValue(this.countryDefault.country_name);
        }
    }

    private _patchValues() {
        const {
            city,
            firstAddress,
            secondAddress,
            state,
            country,
            phone,
            preferredAddress,
            zipCode,
            name,
        } = this.address;

        this.newAddressForm.patchValue({
            city,
            firstAddress,
            secondAddress,
            state,
            country,
            phone,
            preferredAddress,
            zipCode,
            name,
        });
    }
}
