import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoInformationPage } from './photo-information';

@NgModule({
  declarations: [
    PhotoInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoInformationPage),
  ],
})
export class PhotoInformationPageModule {}
