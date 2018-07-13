import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastScanPage } from './last-scan';

@NgModule({
  declarations: [
    LastScanPage,
  ],
  imports: [
    IonicPageModule.forChild(LastScanPage),
  ],
})
export class LastScanPageModule {}
