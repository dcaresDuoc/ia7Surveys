import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraencuestaPageRoutingModule } from './generaencuesta-routing.module';

import { GeneraencuestaPage } from './generaencuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraencuestaPageRoutingModule
  ],
  declarations: [GeneraencuestaPage]
})
export class GeneraencuestaPageModule {}
