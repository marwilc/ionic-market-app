import { Component, OnInit } from '@angular/core';
import { YOUR_WISHLISTS } from '@core/mocks/wish-lists.mock';
import { User } from '@core/models/user.model';
import { WishList } from '@core/models/wish-list.model';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from './components/create-list/create-list.component';

@Component({
    selector: 'app-your-lists',
    templateUrl: './your-lists.page.html',
    styleUrls: ['./your-lists.page.scss'],
})
export class YourListsPage implements OnInit {
    selectedTypeList: string = 'yourList';
    yourLists: WishList[] = YOUR_WISHLISTS;
    user: User = {
        firstName: 'Marwil',
        lastName: 'Campos',
        mail: 'marwilc',
        username: 'marwilc',
    };
    constructor(private _modal: ModalController) {}

    ngOnInit() {}

    onChangeTypeList(event) {
        this.selectedTypeList = event.detail.value;
    }

    async createAList() {
        const createListModal = await this._modal.create({
            component: CreateListComponent,
            cssClass: 'action-sheet-50',
        });

        await createListModal.present();

        const result = await createListModal.onWillDismiss();

        if (result.data) {
            this.yourLists.push(result.data);
        }
    }
}
