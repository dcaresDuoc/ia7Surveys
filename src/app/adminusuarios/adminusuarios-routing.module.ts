import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminusuariosPage } from './adminusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: AdminusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminusuariosPageRoutingModule {}
