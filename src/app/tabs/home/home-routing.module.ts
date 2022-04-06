import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
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
export class HomePageRoutingModule {}
