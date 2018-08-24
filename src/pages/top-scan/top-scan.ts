import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {Artwork} from "../../app/models/artwork";
import {PhotoInformationPage} from "../photo-information/photo-information";
import {Network} from "@ionic-native/network";

/**
 * Generated class for the TopScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-scan',
  templateUrl: 'top-scan.html',
})
export class TopScanPage {
  public opereObservable:Observable<any>;
  public opere:Array<Artwork>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFirestore, public loadingCtrl: LoadingController,private network: Network, private alertCtrl: AlertController) {

    if(this.network.type=="none")
    {
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        connectSubscription.unsubscribe();
      });
      let messageAlert = alertCtrl.create({
        title: 'Avviso:',
        buttons: ['OK'],
        cssClass: 'custom-alert',
        message: "Hei! Per poter utilizzare l'app devi avere la connessione."
      });
      messageAlert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        spinner: "bubbles"
      });
      loader.present();
      let opereCollection=this.db.collection<any>('/Opere', ref => {return ref.orderBy("scansioni","desc")});
    this.opereObservable= opereCollection.valueChanges();
    let count=0;
    this.opereObservable.map(val=>{
      for (let opera of val) {
        if (count < 20){
          this.opere.push(new Artwork(opera.titolo, opera.anno, opera.descrizione, opera.artista, opera.periodo, opera.scansioni, opera.ubicazione, opera.ubicazione_citta, opera.tipologia, opera.dimensioni, opera.img, opera.img_prev, opera.id));
        count++;
      }
      else{
          break;
        }

      }
    }).subscribe(()=>loader.dismissAll());

    }
  }
  showDetails(a:Artwork)
  {
    this.navCtrl.push(PhotoInformationPage,{"artwork":a})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TopScanPage');
  }

}
