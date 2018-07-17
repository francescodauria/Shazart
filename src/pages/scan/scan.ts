import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {style} from "@angular/animations";
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var CameraPreview:any;
@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  public getWidth: number;
  public getHeight : number;
  public calcWidth : number;
  public camera:boolean;
  public i:number;
  public color:boolean;
  constructor(private nav: NavController, private zone:NgZone) {
    this.startCamera();
    this.zone.run(() => {
      this.getWidth = window.screen.width;

      this.getHeight = window.screen.height;
    });
    console.log('width', this.getWidth);

    this.calcWidth = this.getWidth - 80;  // Calculate the width of device and substract 80 from device width;

    console.log('calc width', this.calcWidth);
  }
    startCamera(){
      // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
      CameraPreview.startCamera({x: 0, y: 40, width: window.screen.width, height: window.screen.height, toBack: true, previewDrag: false, tapPhoto: false, tapFocus:true, camera:'rear'});
      //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted
      this.camera=true;
      this.color=true;

      let elements=document.getElementsByClassName("gradient-bg") as  HTMLCollectionOf<Element>;
      for(this.i=0; this.i<elements.length; this.i++)
      {
        elements.item(this.i).className="trasparente";
      }

      elements=document.getElementsByClassName("ios") as HTMLCollectionOf<Element>;
      for(this.i=0; this.i<elements.length; this.i++)
      {
        elements.item(this.i).className="trasparente";
      }
    }

    stopCamera(){
      CameraPreview.stopCamera();
      this.camera=false;
      this.color=false;
      let elements=document.getElementsByClassName("trasparente") as  HTMLCollectionOf<Element>;
      for(this.i=0; this.i<elements.length; this.i++)
      {
        elements.item(this.i).className="gradient-bg";
      }



    }

    takePicture(){

      // let size = {maxWidth: 1024, maxHeight: 640};
      // CameraPreview.takePicture(size);         //Decrepted
      CameraPreview.takePicture({shutterSound:false},function(imgData){
        (<HTMLInputElement>document.getElementById('previewPicture')).src = 'data:image/jpeg;base64,' + imgData;
      });

    }


    SwitchCamera(){
      CameraPreview.switchCamera();
    }
    showCamera(){
      CameraPreview.show();
    }
    hideCamera(){
      CameraPreview.hide();
    }



  }
