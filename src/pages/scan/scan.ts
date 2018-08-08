import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {style} from "@angular/animations";
import {Observable} from 'rxjs-compat'
import {Artwork} from "../../app/models/artwork";
import {PhotoInformationPage} from "../photo-information/photo-information";
import {GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import 'rxjs/add/operator/map';



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
  public i:number=0;
  public risultato:string ="";
  public porta_a_informazioni:boolean=true;
  public trovato_qualcosa:boolean =false;
  public occupato:boolean=false;
  public elementi:any;
  public logoJSON:any;

  constructor(public nav: NavController, private zone:NgZone, public platform:Platform, public vision: GoogleCloudVisionServiceProvider, public menu:MenuController, private db: AngularFirestore) {
    this.menu.swipeEnable(false);
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
      this.risultato="";
      this.trovato_qualcosa=false;
      this.menu.swipeEnable(false);
      this.porta_a_informazioni=true;
      this.risultato=undefined;
      Observable.interval(2000).subscribe(x=>{this.takePicture();});


    }

    stopCamera(){
      CameraPreview.stopCamera();
      this.camera=false;
      this.menu.swipeEnable(true);


    }

    takePicture(){
      let size = {maxWidth: 640, maxHeight: 480};
      // CameraPreview.takePicture(size);         //Decrepted

      let artwork:Artwork;
      CameraPreview.takePicture(size,imgData => {
        if(this.occupato==false){
          this.occupato=true;
          this.vision.getInformation(imgData).subscribe((result) =>
          {
            this.elementi=undefined;
            this.logoJSON=undefined;
            this.logoJSON=result.json().responses[0];

            if(this.logoJSON.labelAnnotations!=undefined)
            {
              for (const item of this.logoJSON.labelAnnotations) {

                switch (item.description) {
                  case "building":{
                    this.db.collection<Artwork>('Opere').doc('Edificio').ref.get().then(doc =>{
                      this.elementi=doc.get("elementi");
                      this.trovato_qualcosa=true;
                      });

                    break;
                  }
                  case "painting":{
                    this.db.collection<Artwork>('Opere').doc('Pittura').ref.get().then(doc =>{
                      this.elementi=doc.get("elementi");

                      this.trovato_qualcosa=true;
                    });
                    break;
                  }
                  case "sculpture":{
                    this.db.collection<Artwork>('Opere').doc('Scultura').ref.get().then(doc =>{
                      this.elementi=doc.get("elementi");
                      this.trovato_qualcosa=true;
                    });
                    break;
                  }
                  case "monument":{
                    this.db.collection<Artwork>('Opere').doc('Monumento').ref.get().then(doc =>{
                      this.elementi=doc.get("elementi");
                      this.trovato_qualcosa=true;
                    });
                    break;
                  }
                }
              }
              //alert("ciao"+JSON.stringify(this.elementi));
            }
            this.occupato=false;
          }, err=> {this.risultato=err;});

          if(this.trovato_qualcosa && this.elementi!=undefined && this.logoJSON!=undefined){

            for (const item of this.logoJSON.webDetection.webEntities) {

              for(const opera of this.elementi)
              {
                if(item.description==opera.id){
                  artwork=new Artwork(opera.titolo,opera.anno,opera.descrizione,opera.artista,opera.periodo,opera.scansioni,opera.ubicazione,opera.ubicazione_citta,opera.tipologia,opera.dimensioni,opera.img,opera.img_prev);
                }
              }
            }
          }
          if(this.trovato_qualcosa && this.porta_a_informazioni)
          {
            this.nav.push(PhotoInformationPage,{"artwork":artwork});
            this.stopCamera();
            this.porta_a_informazioni=false;

          }

        }







        //alert("Ho scattato");
      });
    }

    controlloDettagli(){

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
