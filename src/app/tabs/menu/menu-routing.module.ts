import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
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
    {
        path: 'your-orders',
        loadChildren: () =>
            import('../../your-orders/your-orders.module').then(
                (m) => m.YourOrdersPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuPageRoutingModule {}
