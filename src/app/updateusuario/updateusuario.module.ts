import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateusuarioPageRoutingModule } from './updateusuario-routing.module';

import { UpdateusuarioPage } from './updateusuario.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateusuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateusuarioPage]
})
export class UpdateusuarioPageModule {}
