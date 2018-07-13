import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopScanPage } from './top-scan';

@NgModule({
  declarations: [
    TopScanPage,
  ],
  imports: [
    IonicPageModule.forChild(TopScanPage),
  ],
})
export class TopScanPageModule {}
