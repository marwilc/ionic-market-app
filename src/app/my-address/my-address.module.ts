import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { LocationHeaderComponent } from './components';
import { AddNewAddressComponent } from './components/add-new-address';
import { DialogAddressesComponent } from './components/dialog-addresses';
import { MyAddressPageRoutingModule } from './my-address-routing.module';
import { MyAddressPage } from './my-address.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        MyAddressPageRoutingModule,
    ],
    declarations: [
        MyAddressPage,
        DialogAddressesComponent,
        AddNewAddressComponent,
        LocationHeaderComponent,
    ],
    exports: [DialogAddressesComponent, LocationHeaderComponent],
})
export class MyAddressPageModule {}
