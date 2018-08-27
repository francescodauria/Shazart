import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  Events,
  AlertController, Platform
} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Artwork} from "../../app/models/artwork";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {Network} from "@ionic-native/network";
import {Crop} from "@ionic-native/crop";
import {Camera} from "@ionic-native/camera";
import {Base64} from "@ionic-native/base64";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {
  private opereArray: Array<Artwork>=[];

  private utenteObservable: Observable<any>;
  private sizePreferiti:number;
  private sizeScan:number;

  // You can get this data from your API. This is a dumb data for being an example.
  public user_data = {
    profile_img: '',
    name: '',
    surname: '',
    username: '',
    password:'',
    description: '',
    email: '',
    gender: '',
    nationality:''
  };

  public options: any = {
    allowEdit: true,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: this.camera.MediaType.ALLMEDIA,
    destinationType: this.camera.DestinationType.FILE_URI
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public db:AngularFirestore,
    private network: Network,
    private camera:Camera,
    private crop:Crop,
    private platform:Platform,
    private alertControl: AlertController,
    private base64: Base64,
    private alertCtrl:AlertController
  ) {
    if (this.network.type != "none") {
      let loader = this.loadingCtrl.create({
        spinner: "bubbles"
      });
      loader.present().then(() => {
        let utenteCollection = this.db.collection<any>('/Utenti', ref => {
          return ref.where("username", "==", localStorage.getItem("username"))
        });
        this.utenteObservable = utenteCollection.valueChanges();
        this.utenteObservable.map(val => {
          this.opereArray = [];
          let opere = val[0].scan;
          this.sizePreferiti = val[0].like.length;
          this.sizeScan = val[0].scan.length;
          this.user_data.profile_img=val[0].foto_profilo;
          this.user_data.name = val[0].nome;
          this.user_data.surname = val[0].cognome;
          this.user_data.username = val[0].username;
          this.user_data.password = val[0].password;
          this.user_data.description = val[0].informazioni;
          this.user_data.nationality = val[0].nazionalita;
          this.user_data.gender = val[0].sesso;
          this, this.user_data.email = val[0].email;

        }).subscribe(()=>loader.dismissAll());

      }); // Get back to profile page. You should do that after you got data from API

    }
    else{
      let messageAlert = this.alertControl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, per visualizzare i dati hai bisogno della connessione.'
      });
      messageAlert.present();

    }
  }

  updateProfile() {
    if (this.network.type != "none") {
      let loader = this.loadingCtrl.create({
        spinner: "bubbles",
        cssClass: "caricamento"
      });
      loader.present().then(() => {

        if(this.user_data.profile_img.length>1000000){
          let messageAlert = this.alertCtrl.create({
            title: 'Avviso:',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: "Hei! Hai scelto un'immagine troppo grande, non deve superare 1MB"
          });
          messageAlert.present();
        }

          this.db.collection("/Utenti").doc(this.user_data.username).update({
            foto_profilo: this.user_data.profile_img,
            nome: this.user_data.name,
            cognome: this.user_data.surname,
            password: this.user_data.password,
            informazioni: this.user_data.description,
            email: this.user_data.email,
            nazionalita: this.user_data.nationality,
            sesso: this.user_data.gender
          });

        loader.dismissAll()
      }); // Get back to profile page. You should do that after you got data from API

    }
    else{
      let messageAlert = this.alertControl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, per autenticarti hai bisogno della connessione.'
      });
      messageAlert.present();

    }
  }

  changePhoto(){

    return this.camera.getPicture(this.options)
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
            this.user_data.profile_img=("data:image/jpeg;base64,"+stringa.split("data:image/*;charset=utf-8;base64,")[1]).replace(/\n|\r|\t/g,""))
      })
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
