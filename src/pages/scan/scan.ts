import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {style} from "@angular/animations";
import {Observable} from 'rxjs'
import {Artwork} from "../../app/models/artwork";
import {PhotoInformationPage} from "../photo-information/photo-information";
import {GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
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
  public risultato:string;
  public porta_a_informazioni:boolean=true;


  constructor(public nav: NavController, private zone:NgZone, public platform:Platform, public vision: GoogleCloudVisionServiceProvider, public menu:MenuController) {
    this.menu.swipeEnable(false);
    this.startCamera();
    this.zone.run(() => {
      this.getWidth = window.screen.width;

      this.getHeight = window.screen.height;
    });
    console.log('width', this.getWidth);

    this.calcWidth = this.getWidth - 80;  // Calculate the width of device and substract 80 from device width;

    console.log('calc width', this.calcWidth);
    Observable.interval(2000).subscribe(x=>{this.takePicture();});

  }
    startCamera(){
      // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
      CameraPreview.startCamera({x: 0, y: 40, width: window.screen.width, height: window.screen.height, toBack: true, previewDrag: false, tapPhoto: false, tapFocus:true, camera:'rear'});
      //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted
      this.camera=true;
      this.menu.swipeEnable(false);

    }

    stopCamera(){
      CameraPreview.stopCamera();
      this.camera=false;
      this.menu.swipeEnable(true);


    }

    takePicture(){
      // let size = {maxWidth: 1024, maxHeight: 640};
      // CameraPreview.takePicture(size);         //Decrepted
      CameraPreview.takePicture(imgData => {

          this.vision.getInformation(imgData).subscribe((result) => this.risultato=result.json().responses[0].logoAnnotations[0].description, err=> {this.risultato=err;});
         if(this.porta_a_informazioni==true && this.risultato!=undefined)
         {
           this.nav.push(PhotoInformationPage,{information:this.risultato,foto:imgData});
           this.stopCamera();
           this.porta_a_informazioni=false;

         }



        //alert("Ho scattato");
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
