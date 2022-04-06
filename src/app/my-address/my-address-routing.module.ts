import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAddressPage } from './my-address.page';

const routes: Routes = [
  {
    path: '',
    component: MyAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAddressPageRoutingModule {}
