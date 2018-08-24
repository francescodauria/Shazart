import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  Events,
  AlertController
} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Artwork} from "../../app/models/artwork";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {Network} from "@ionic-native/network";

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
    profile_img: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/13937764_10208899139974056_7157026056838053495_o.jpg?_nc_cat=0&oh=5298fb6f9d840a6c35597aed49540982&oe=5BDFA0EF',
    name: '',
    surname: '',
    username: '',
    password:'',
    description: '',
    email: '',
    gender: '',
    nationality:''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public db:AngularFirestore,
    private network: Network,
    private alertControl: AlertController
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
        message: 'Hei, per autenticarti hai bisogno della connessione.'
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
        this.db.collection("/Utenti").doc(this.user_data.username).update({
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
