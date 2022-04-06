import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { CheckoutPage } from './checkout.page';
import {
    StepFourComponent,
    StepOneComponent,
    StepThreeComponent,
    StepTwoComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        CheckoutPageRoutingModule,
    ],
    declarations: [
        CheckoutPage,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        StepFourComponent,
    ],
})
export class CheckoutPageModule {}
