import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateusuarioPage } from './updateusuario.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateusuarioPageRoutingModule {}
