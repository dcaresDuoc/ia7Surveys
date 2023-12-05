import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminusuariosPageRoutingModule } from './adminusuarios-routing.module';

import { AdminusuariosPage } from './adminusuarios.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminusuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminusuariosPage]
})
export class AdminusuariosPageModule {}
