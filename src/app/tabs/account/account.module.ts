import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { YourAccountComponent } from './your-account/your-account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        AccountPageRoutingModule,
    ],
    declarations: [AccountPage, YourAccountComponent],
})
export class AccountPageModule {}
