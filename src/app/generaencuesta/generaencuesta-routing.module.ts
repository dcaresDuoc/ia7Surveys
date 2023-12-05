import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraencuestaPage } from './generaencuesta.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraencuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraencuestaPageRoutingModule {}
