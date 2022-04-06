import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        HttpClientModule,
        ProductPageRoutingModule,
    ],
    declarations: [ProductPage],
    exports: [],
})
export class ProductPageModule {}
