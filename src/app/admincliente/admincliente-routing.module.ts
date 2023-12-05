import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminclientePage } from './admincliente.page';

const routes: Routes = [
  {
    path: '',
    component: AdminclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminclientePageRoutingModule {}
