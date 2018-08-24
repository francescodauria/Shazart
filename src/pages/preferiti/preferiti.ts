import {Component, ViewChild} from '@angular/core';

import {AlertController, App, Content, LoadingController, NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {PhotoInformationPage} from "../photo-information/photo-information";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Artwork} from "../../app/models/artwork";
import construct = Reflect.construct;
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-preferiti',
  templateUrl: 'preferiti.html'
})

export class PreferitiPage {
  @ViewChild(Content) content:Content;
  private opereArray: Array<Artwork>=[];
  private opereArrayReverse: Array<Artwork>=[];

  private utenteObservable: Observable<any>;
  private sizePreferiti:number;
  private sizeScan:number;

  public constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFirestore, public app:App,  public loadingCtrl: LoadingController,private network: Network, private alertCtrl: AlertController) {

    if(this.network.type=="none")
    {
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.navCtrl.setRoot(this.navCtrl.getActiveChildNav());
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
      let utenteCollection;
      utenteCollection=this.db.collection<any>('/Utenti', ref => {return ref.where("username", "==",localStorage.getItem("username"))});
      this.utenteObservable= utenteCollection.valueChanges();
      this.utenteObservable.map(val=>{
        this.opereArray=[];
        let opere=val[0].like;
        this.sizePreferiti=val[0].like.length;
        this.sizeScan=val[0].scan.length;
        for(let o of opere)
        {
          let opereLikeCollection=this.db.collection<any>("/Opere", ref => {return ref.where("id","==",o.titolo)})
          let opereObservable:Observable<any>=opereLikeCollection.valueChanges();
          opereObservable.map(opera=>{
            this.opereArray.unshift(new Artwork(opera[0].titolo, opera[0].anno, opera[0].descrizione, opera[0].artista, opera[0].periodo, opera[0].scansioni, opera[0].ubicazione, opera[0].ubicazione_citta, opera[0].tipologia, opera[0].dimensioni, opera[0].img, opera[0].img_prev,opera[0].id));
          }).subscribe(()=>loader.dismissAll());
        }
      }).subscribe();

    }
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }


  showDetails(a:Artwork)
  {
    this.navCtrl.push(PhotoInformationPage,{"artwork":a})
  }
}
