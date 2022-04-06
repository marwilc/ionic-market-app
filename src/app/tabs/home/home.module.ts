import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { MyAddressPageModule } from 'src/app/my-address/my-address.module';
import { ProductPageModule } from 'src/app/product/product.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        HttpClientModule,
        ProductPageModule,
        HomePageRoutingModule,
        MyAddressPageModule,
    ],
    declarations: [HomePage],
})
export class HomePageModule {}
