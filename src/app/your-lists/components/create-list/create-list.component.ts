import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WishList } from '@core/models/wish-list.model';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
    createListForm: FormGroup = this._createForm();
    attempt: boolean = false;

    constructor(
        private _fb: FormBuilder,
        private _modal: ModalController
    ) {}

    ngOnInit() {}

    /**
     * submit form
     *
     * @return {*}
     * @memberof CreateListComponent
     */
    submit() {
        if (this.createListForm.invalid || this.attempt) {
            return;
        }

        // dispatch create list

        this.attempt = true;

        const { name } = this.createListForm.value;

        setTimeout(() => {
            this.attempt = false;

            const newList: WishList = {
                id: 1,
                name,
                productCover: null,
                type: 'private',
            };

            this._modal.dismiss(newList);
        }, 6000);
    }

    async close() {
        await this._modal.dismiss();
    }

    /**
     * create form list
     *
     * @private
     * @return {*}
     * @memberof CreateListComponent
     */
    private _createForm() {
        return this._fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ],
            ],
        });
    }
}
