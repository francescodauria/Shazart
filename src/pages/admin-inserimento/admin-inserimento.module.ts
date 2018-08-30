import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminInserimentoPage } from './admin-inserimento';

@NgModule({
  declarations: [
    AdminInserimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminInserimentoPage),
  ],
})
export class AdminInserimentoPageModule {}
