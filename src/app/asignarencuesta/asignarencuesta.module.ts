import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarencuestaPageRoutingModule } from './asignarencuesta-routing.module';

import { AsignarencuestaPage } from './asignarencuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarencuestaPageRoutingModule
  ],
  declarations: [AsignarencuestaPage]
})
export class AsignarencuestaPageModule {}
