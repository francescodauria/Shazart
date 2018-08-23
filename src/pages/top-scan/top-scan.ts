import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {Artwork} from "../../app/models/artwork";
import {PhotoInformationPage} from "../photo-information/photo-information";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFirestore) {
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




    }).subscribe();
  }


  showDetails(a:Artwork)
  {
    this.navCtrl.push(PhotoInformationPage,{"artwork":a})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TopScanPage');
  }

}
