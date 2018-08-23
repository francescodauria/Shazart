import { Component } from '@angular/core';

import {App, NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {PhotoInformationPage} from "../photo-information/photo-information";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Artwork} from "../../app/models/artwork";

@Component({
  selector: 'page-preferiti',
  templateUrl: 'preferiti.html'
})
export class PreferitiPage {
  private opereArray: Array<Artwork>=[];
  private opereArrayReverse: Array<Artwork>=[];

  private utenteObservable: Observable<any>;
  private sizePreferiti:number;
  private sizeScan:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFirestore, public app:App) {
    let utenteCollection=this.db.collection<any>('/Utenti', ref => {return ref.where("username", "==",localStorage.getItem("username"))});
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
        }).subscribe();
      }
    }).subscribe();

  }




  showDetails(a:Artwork)
  {
    this.navCtrl.push(PhotoInformationPage,{"artwork":a})
  }
}
