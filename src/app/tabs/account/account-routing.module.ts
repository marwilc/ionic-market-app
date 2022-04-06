import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';
import { YourAccountComponent } from './your-account/your-account.component';

const routes: Routes = [
    {
        path: '',
        component: AccountPage,
    },
    {
        path: 'product',
        loadChildren: () =>
            import('../../product/product.module').then(
                (m) => m.ProductPageModule
            ),
    },
    {
        path: 'your-lists',
        loadChildren: () =>
            import('../../your-lists/your-lists.module').then(
                (m) => m.YourListsPageModule
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
    {
        path: 'your-address',
        loadChildren: () =>
            import('../../my-address/my-address.module').then(
                (m) => m.MyAddressPageModule
            ),
    },
    {
        path: 'your-account',
        component: YourAccountComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountPageRoutingModule {}
