import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { MyAddressPageModule } from 'src/app/my-address/my-address.module';
import { ProductPageModule } from 'src/app/product/product.module';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartPageRoutingModule,
        ProductPageModule,
        SharedModule,
        MyAddressPageModule,
    ],
    declarations: [CartPage, EmptyCartComponent],
})
export class CartPageModule {}
