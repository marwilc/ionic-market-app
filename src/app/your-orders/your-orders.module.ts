import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { YourOrdersPageRoutingModule } from './your-orders-routing.module';
import { YourOrdersPage } from './your-orders.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        IonicModule,
        YourOrdersPageRoutingModule,
    ],
    declarations: [YourOrdersPage, OrderDetailComponent],
})
export class YourOrdersPageModule {}
