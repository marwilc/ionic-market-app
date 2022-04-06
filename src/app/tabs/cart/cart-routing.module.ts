import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGuard } from 'src/app/checkout/guards/checkout.guard';
import { CartPage } from './cart.page';

const routes: Routes = [
    {
        path: '',
        component: CartPage,
    },
    {
        path: 'product',
        loadChildren: () =>
            import('../../product/product.module').then(
                (m) => m.ProductPageModule
            ),
    },
    {
        path: 'checkout',
        canLoad: [CheckoutGuard],
        loadChildren: () =>
            import('../../checkout/checkout.module').then(
                (m) => m.CheckoutPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartPageRoutingModule {}
