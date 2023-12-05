import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarencuestaPage } from './asignarencuesta.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarencuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarencuestaPageRoutingModule {}
