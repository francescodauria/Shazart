import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {style} from "@angular/animations";
import {Observable, Subscription} from 'rxjs-compat'
import {Artwork} from "../../app/models/artwork";
import {PhotoInformationPage} from "../photo-information/photo-information";
import {GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import 'rxjs/add/operator/map';
import {firestore} from "firebase";


/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var CameraPreview: any;

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  public getWidth: number;
  public getHeight: number;
  public calcWidth: number;
  public camera: boolean;
  public i: number = 0;
  public risultato: string = "";
  public porta_a_informazioni: boolean = true;
  public trovato_qualcosa: boolean = false;
  public occupato: boolean = false;
  public logoJSON: any;
  public subscription:Subscription;

  constructor(public nav: NavController, private zone: NgZone, public platform: Platform, public vision: GoogleCloudVisionServiceProvider, public menu: MenuController, private db: AngularFirestore) {
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

  startCamera() {
    // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    CameraPreview.startCamera({
      x: 0,
      y: 40,
      width: window.screen.width,
      height: window.screen.height,
      toBack: true,
      previewDrag: false,
      tapPhoto: false,
      tapFocus: true,
      camera: 'rear'
    });
    //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted
    this.camera = true;
    this.menu.swipeEnable(false);
    this.risultato = undefined;
    this.occupato = false;
    Observable.interval(1000).subscribe(x => {
      this.takePicture();
    });


  }

  stopCamera() {
    CameraPreview.stopCamera();
    this.camera = false;
    this.menu.swipeEnable(true);


  }

  takePicture() {
    let size = {maxWidth: 640, maxHeight: 480};
    // CameraPreview.takePicture(size);         //Decrepted

    let artwork: Artwork;
    CameraPreview.takePicture(size, imgData => {
        if (this.occupato == false) {
          this.occupato = true;
         //alert(this.occupato);
          this.trovato_qualcosa = false;


          this.vision.getInformation(imgData).subscribe((result) => {
            //alert("Nuova chiamata");
            this.logoJSON = result.json().responses[0];


            if (this.logoJSON.labelAnnotations != undefined) {
              //alert(JSON.stringify(this.logoJSON.labelAnnotations))

              for (const item of this.logoJSON.labelAnnotations) {

                switch (item.description) {
                  case "building": {
                    this.risultato = "Edificio";
                    break;
                  }
                  case "painting": {
                    //alert("è entrato in painting");
                    this.risultato = "Pittura";
                    break;

                  }
                  case "sculpture": {
                    this.risultato = "Scultura";
                    break;
                  }
                  case "monument": {
                    this.risultato = "Monumento";

                    break;
                  }
                }
              }
              //alert("ciao"+JSON.stringify(this.elementi));
            }
            else {
              this.occupato = false;
              //alert("la label è undefined e occupato è false");
            }


            if (this.occupato) {
              if (this.risultato != undefined) {
                this.subscription=this.db.collection<any>(this.risultato).valueChanges().map(value => {
                  for(let opera of value){
                    for(const item of this.logoJSON.webDetection.webEntities)
                    {
                      if(item.description==opera.id)
                      {
                        artwork = new Artwork(opera.titolo, opera.anno, opera.descrizione, opera.artista, opera.periodo, opera.scansioni+1, opera.ubicazione, opera.ubicazione_citta, opera.tipologia, opera.dimensioni, opera.img, opera.img_prev,opera.id);
                        this.trovato_qualcosa = true;
                      }
                    }
                  }

                  if (!this.trovato_qualcosa) {
                    this.occupato = false;
                  }
                  else {
                    this.nav.push(PhotoInformationPage, {"artwork": artwork});
                    this.db.collection(artwork.tipologia).doc(artwork.id).update({scansioni:artwork.scansioni});
                    this.subscription.unsubscribe();
                    this.db.collection("/Utenti").doc(localStorage.getItem("username")).update({scan: firestore.FieldValue.arrayRemove({"titolo":artwork.id,"tipologia":artwork.tipologia})});
                    this.db.collection("/Utenti").doc(localStorage.getItem("username")).update({scan: firestore.FieldValue.arrayUnion({"titolo":artwork.id,"tipologia":artwork.tipologia})});
                    this.stopCamera();
                    this.porta_a_informazioni = false;
                  }
                }).subscribe();
              }

              else {
                this.occupato = false;
              }


            }


            }, err => {
            this.risultato = err;

          });


        }
      }
    );
  }

  controlloDettagli() {

  }

  SwitchCamera() {
    CameraPreview.switchCamera();
  }

  showCamera() {
    CameraPreview.show();
  }

  hideCamera() {
    CameraPreview.hide();
  }


}
