import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloPage } from './profilo';

@NgModule({
  declarations: [
    ProfiloPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiloPage),
  ],
})
export class ProfiloPageModule {}
