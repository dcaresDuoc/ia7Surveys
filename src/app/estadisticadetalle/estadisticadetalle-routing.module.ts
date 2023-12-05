import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticadetallePage } from './estadisticadetalle.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticadetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticadetallePageRoutingModule {}
