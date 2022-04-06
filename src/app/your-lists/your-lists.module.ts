import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { YourListsPageRoutingModule } from './your-lists-routing.module';
import { YourListsPage } from './your-lists.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        YourListsPageRoutingModule,
    ],
    declarations: [
        YourListsPage,
        ListDetailComponent,
        CreateListComponent,
    ],
})
export class YourListsPageModule {}
