import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('./home/home.module').then(
                        (m) => m.HomePageModule
                    ),
            },
            {
                path: 'account',
                loadChildren: () =>
                    import('./account/account.module').then(
                        (m) => m.AccountPageModule
                    ),
            },
            {
                path: 'cart',
                loadChildren: () =>
                    import('./cart/cart.module').then(
                        (m) => m.CartPageModule
                    ),
            },
            {
                path: 'menu',
                loadChildren: () =>
                    import('./menu/menu.module').then(
                        (m) => m.MenuPageModule
                    ),
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
