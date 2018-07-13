import { Component } from '@angular/core';


import {ProfiloPage} from "../profilo/profilo";
import {LastScanPage} from "../last-scan/last-scan";
import {PreferitiPage} from "../preferiti/preferiti";

//import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //in base all'ordine in cui sono disposti vengono caricate le varie pagine
  tab1Root = ProfiloPage;
  tab2Root = LastScanPage;
  tab3Root = PreferitiPage;


  constructor(/*private camera: Camera*/) {

  }
/*
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }*/
}
