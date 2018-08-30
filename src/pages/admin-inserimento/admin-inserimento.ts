import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {Crop} from "@ionic-native/crop";
import {Base64} from "@ionic-native/base64";
import {GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import {Network} from "@ionic-native/network";
import {HelloIonicPage} from "../hello-ionic/hello-ionic";
import {LoginPage} from "../login/login";
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the AdminInserimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-inserimento',
  templateUrl: 'admin-inserimento.html',
})
export class AdminInserimentoPage {

  public artwork_data = {
    anno: '',
    artista: '',
    descrizione: '',
    dimensioni: '',
    id:'',
    img: '',
    img_prev: '',
    periodo: '',
    tipologia:'',
    titolo:'',
    ubicazione:'',
    ubicazione_citta:'',
    scansioni:0
  };
  private logoJSON: any;
  private entities:Array<string>=[];
  constructor(private db: AngularFirestore,private alertCtrl:AlertController,private network: Network,public loadingCtrl: LoadingController,public vision: GoogleCloudVisionServiceProvider,  public menu:MenuController, private platform:Platform, private camera:Camera,private crop:Crop,private base64: Base64,public navCtrl: NavController, public navParams: NavParams) {

    this.menu.enable(false);

  }
  public optionsPreview: any = {
    allowEdit: true,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: this.camera.MediaType.ALLMEDIA,
    destinationType: this.camera.DestinationType.FILE_URI
  }
  public optionsPhoto: any = {
    allowEdit: true,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: this.camera.MediaType.ALLMEDIA,
    destinationType: this.camera.DestinationType.DATA_URL
  }
  insertPhotoPreview(){
    return this.camera.getPicture(this.optionsPreview)
      .then((fileUri) => {
        // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */

          return this.crop.crop(fileUri, { quality: 100, targetWidth: -1, targetHeight: -1 });
        }
      })
      .then((path) => {
        this.base64.encodeFile(path)
          .then((stringa)=>
            this.artwork_data.img_prev=("data:image/jpeg;base64,"+stringa.split("data:image/*;charset=utf-8;base64,")[1]).replace(/\n|\r|\t/g,""))
      })
  }

    insertPhoto() {
      return this.camera.getPicture(this.optionsPhoto)
        .then((imageData) => {
          this.base64.encodeFile(imageData)

          .then((stringa)=>
              this.artwork_data.img=("data:image/jpeg;base64,"+stringa.split("data:image/*;charset=utf-8;base64,")[1]).replace(/\n|\r|\t/g,""))
          })
    }

    callVision(){

    if(this.artwork_data.img=="")
    {
      let messageAlert = this.alertCtrl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, non hai selezionato nessuna immagine da analizzare.'
      });
      messageAlert.present();
    }
    else {
      if (this.network.type != "none") {
        let loader = this.loadingCtrl.create({
          spinner: "bubbles"
        });
        loader.present();
        this.vision.getInformation(this.artwork_data.img.split("data:image/jpeg;base64,")[1]).subscribe((result) => {
          this.logoJSON = result.json().responses[0];
          for (const item of this.logoJSON.webDetection.webEntities) {
            this.entities.push(item.description);
          }
          loader.dismissAll();
        }, error => alert(error));
      }
      else {

        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Hei, per richiedere suggerimenti hai bisogno di una connessione.'
        });
        messageAlert.present();
      }
       }
      }


  insertArtwork(){

      if(this.artwork_data.id==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo id non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.titolo==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo titolo non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.artista==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo artista non è stato compilato'
        });
        messageAlert.present();
      }

      else if(this.artwork_data.descrizione==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo descrizione non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.anno==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo anno non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.dimensioni==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo dimensioni non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.periodo==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo periodo non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.tipologia==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo tipologia non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.ubicazione==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo ubicazione non è stato compilato'
        });
        messageAlert.present();
      }
      else if(this.artwork_data.ubicazione_citta==''){
        let messageAlert = this.alertCtrl.create({
          title: 'Attenzione!',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Il campo città non è stato compilato'
        });
        messageAlert.present();
      }

      else{
        if (this.network.type != "none") {
          let loader = this.loadingCtrl.create({
            spinner: "bubbles"
          });
          loader.present();



          this.db.collection("Opere").doc(this.artwork_data.id).set({
            anno:this.artwork_data.anno,
            artista: this.artwork_data.artista,
            descrizione: this.artwork_data.descrizione,
            dimensioni: this.artwork_data.dimensioni,
            id: this.artwork_data.id,
            img: this.artwork_data.img,
            img_prev: this.artwork_data.img_prev,
            periodo: this.artwork_data.periodo,
            scansioni:0,
            tipologia:this.artwork_data.tipologia,
            titolo: this.artwork_data.titolo,
            ubicazione:this.artwork_data.ubicazione,
            ubicazione_citta:this.artwork_data.ubicazione_citta
          }).then(()=>{
            loader.dismissAll();
            let messageAlert = this.alertCtrl.create({
              title: 'Ben fatto!',
              buttons: ['OK'],
              cssClass: 'custom-alert',
              message: "Inserimento avvenuto con successo."
            });
            messageAlert.present();
            this.navCtrl.setRoot(AdminInserimentoPage);
          });

        }
        else{
          let messageAlert = this.alertCtrl.create({
            title: 'Attenzione!',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: "Hei, per richiedere salvare l'opera hai bisogno di una connessione."
          });
          messageAlert.present();
        }
      }

  }

  protected adjustTextarea(event: any): void {
    let textarea: any		= event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height 	= 'auto';
    textarea.style.height 	= textarea.scrollHeight + 'px';
    return;
  }

  openWikipedia(){
    window.open('https://it.wikipedia.org/w/index.php?search='+this.artwork_data.titolo, '_system', 'location=yes');
  }

  logout(){
    let messageAlert = this.alertCtrl.create({
      title: 'Attenzione!',
      cssClass: 'custom-alert',
      message: "Sei sicuro di voler effettuare il logout?",
      buttons: [

        {
          text: 'Annulla',
          role: 'cancel',

        },
        {
          text: 'Si',
          handler: () => {
            this.navCtrl.setRoot(LoginPage,{animation:'ios-transition',direction:'forward'});
            localStorage.setItem("username", "undefined");
            localStorage.setItem("password","undefined");
          }
        },
      ]
    });
    messageAlert.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminInserimentoPage');
  }

}
