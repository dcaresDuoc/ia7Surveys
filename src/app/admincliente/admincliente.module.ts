import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminclientePageRoutingModule } from './admincliente-routing.module';

import { AdminclientePage } from './admincliente.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminclientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminclientePage]
})
export class AdminclientePageModule {}
