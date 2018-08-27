import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  App,
  Events,
  IonicPage,
  LoadingController,
  MenuController,
  Nav,
  NavController,
  NavParams
} from 'ionic-angular';
import {HelloIonicPage} from "../hello-ionic/hello-ionic";
import {MyApp} from "../../app/app.component";
import {Artwork} from "../../app/models/artwork";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {TabsPage} from "../tabs/tabs";
import {TopScanPage} from "../top-scan/top-scan";
import {rootRenderNodes} from "@angular/core/src/view";
import {templateSourceUrl} from "@angular/compiler";
import {Subscription} from "rxjs/Subscription";
import {Network} from "@ionic-native/network";

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
  private setRoot:boolean=true;
  private subscription:Subscription;

  constructor(private alertControl: AlertController,public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,private db: AngularFirestore, public loadingCtrl: LoadingController,private network: Network) {
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
    if (this.network.type != "none") {


      let loader = this.loadingCtrl.create({
        spinner: "bubbles"
      });

        if (this.username == "" && this.password != "") {
          let messageAlert = this.alertControl.create({
            title: 'Attenzione!',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: 'Hei, devi inserire un username per accedere'
          });
          messageAlert.present();
        }
        else if (this.username != "" && this.password == "") {
          let messageAlert = this.alertControl.create({
            title: 'Attenzione!',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: 'Hei, devi inserire una password per accedere'
          });
          messageAlert.present();
        }
        else if (this.username == "" && this.password == "") {
          let messageAlert = this.alertControl.create({
            title: 'Attenzione!',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: 'Hei, devi inserire un username ed una password per accedere'
          });
          messageAlert.present();
        }
        else {

          loader.present();
          let utenteCollection = this.db.collection<any>('/Utenti', ref => {
            return ref.where("username", "==", this.username)
          });

          this.utenteObservable = utenteCollection.valueChanges();
          this.subscription = this.utenteObservable.map(val => {
            // timeout(3000);
            if (val[0] != undefined) {
              if (val[0].password == this.password) {
                localStorage.setItem("username", this.username);
                localStorage.setItem("password", this.password);
                loader.dismissAll();
                this.menu.enable(true);
                this.subscription.unsubscribe();
                this.navCtrl.setRoot(HelloIonicPage);
              }
              else {
                loader.dismissAll();
                let messageAlert = this.alertControl.create({
                  title: 'Attenzione!',
                  buttons: ['OK'],
                  cssClass: 'custom-alert',
                  message: 'Hei, la password che hai inserito è errata'
                });
                messageAlert.present();
              }
            }
            else {
              loader.dismissAll();
              let messageAlert = this.alertControl.create({
                title: 'Attenzione!',
                cssClass: 'custom-alert',
                message: "Hei, l'username inserito non è presente, vuoi registrarti con questo username?",
                buttons: [

                  {
                    text: 'Annulla',
                    role: 'cancel',

                  },
                  {
                    text: 'Ok',
                    handler: () => {

                      this.db.collection("Utenti").doc(this.username).set({
                        foto_profilo:"",
                        nome: "",
                        cognome: "",
                        email: "",
                        informazioni: "Ciao sto usando Shazart!",
                        nazionalità: "",
                        password: this.password,
                        sesso: "",
                        username: this.username,
                        like: [],
                        scan: []
                      })

                      localStorage.setItem("username", this.username);
                      localStorage.setItem("password", this.password);
                      loader.dismissAll();
                      this.subscription.unsubscribe();
                      this.navCtrl.setRoot(HelloIonicPage);
                      this.menu.enable(true);
                    }
                  },
                ]
              });
              messageAlert.present();
            }

          }).subscribe();


        }

        //let a:Artwork=new Artwork("La gioconda","1503","Quadro","Leonardo","Rinascimento",0,"Louvre","Quadro","50x30",null,null);

       // Get back to profile page. You should do that after you got data from API
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
}
