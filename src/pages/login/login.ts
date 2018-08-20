import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HelloIonicPage} from "../hello-ionic/hello-ionic";
import {MyApp} from "../../app/app.component";
import {Artwork} from "../../app/models/artwork";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  private utenteObservable: Observable<any>;

  constructor(private alertControl: AlertController,public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,private db: AngularFirestore) {
    this.menu.enable(false);
    this.username = "";
    this.password= "";
    if(localStorage.getItem("username")!="undefined" && localStorage.getItem("username")!=null && localStorage.getItem("password")!="undefined")
    {
      this.username= localStorage.getItem("username");
      this.password=localStorage.getItem("password" );
      this.login();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    if(this.username=="" && this.password!="") {
      let messageAlert = this.alertControl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, devi inserire un username per accedere'
      });
      messageAlert.present();
    }
    else if(this.username!="" && this.password==""){
      let messageAlert = this.alertControl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, devi inserire una password per accedere'
      });
      messageAlert.present();
    }
    else if(this.username=="" && this.password==""){
      let messageAlert = this.alertControl.create({
        title: 'Attenzione!',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: 'Hei, devi inserire un username ed una password per accedere'
      });
      messageAlert.present();
    }
    else{


      let utenteCollection=this.db.collection<any>('/Utenti', ref => {return ref.where("username", "==",this.username)});

      this.utenteObservable= utenteCollection.valueChanges();
      this.utenteObservable.map(val => {
     // timeout(3000);
        if(val[0]!=undefined){
          if(val[0].password==this.password){
            localStorage.setItem("username", this.username);
            localStorage.setItem("password",this.password);
            this.navCtrl.setRoot(HelloIonicPage);
            this.menu.enable(true);
          }
          else{
            let messageAlert = this.alertControl.create({
              title: 'Attenzione!',
              buttons: ['OK'],
              cssClass: 'custom-alert',
              message: 'Hei, la password che hai inserito è errata'
            });
            messageAlert.present();
          }
        }
        else{
          let messageAlert = this.alertControl.create({
            title: 'Attenzione!',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: "Hei, l'username inserito non è corretto"
          });
          messageAlert.present();
        }
      })      .subscribe(val => console.log(val));


    }

    //let a:Artwork=new Artwork("La gioconda","1503","Quadro","Leonardo","Rinascimento",0,"Louvre","Quadro","50x30",null,null);

  }
}
