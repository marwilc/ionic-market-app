import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { YourOrdersPage } from './your-orders.page';

const routes: Routes = [
    {
        path: '',
        component: YourOrdersPage,
    },
    {
        path: ':id',
        component: OrderDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YourOrdersPageRoutingModule {}
