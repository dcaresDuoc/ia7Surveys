import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticadetallePageRoutingModule } from './estadisticadetalle-routing.module';

import { EstadisticadetallePage } from './estadisticadetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticadetallePageRoutingModule
  ],
  declarations: [EstadisticadetallePage]
})
export class EstadisticadetallePageModule {}
