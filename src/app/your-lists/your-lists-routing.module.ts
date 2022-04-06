import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailComponent } from './components/list-detail';
import { YourListsPage } from './your-lists.page';

const routes: Routes = [
    {
        path: '',
        component: YourListsPage,
    },
    {
        path: ':id',
        component: ListDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YourListsPageRoutingModule {}
