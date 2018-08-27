import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App} from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Artwork} from "../../app/models/artwork";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {firestore} from "firebase";

declare let cordova: any;

/**
 * Generated class for the PhotoInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-information',
  templateUrl: 'photo-information.html',
})
export class PhotoInformationPage {
  images = ['logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png','logo.png'];
  private artwork:Artwork;
  private liked:boolean=false;
  private opereObservable: Observable<Artwork[]>;
  public opereArrayUbicazione: Array<Artwork> =[];
  public opereArrayPeriodo: Array<Artwork> =[];
  private utenteObservable: Observable<any>;
  private opereArray: Array<Artwork>=[];


  constructor(private alertCtrl: AlertController,private diagnostic: Diagnostic,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator,private db:AngularFirestore) {

    this.artwork=this.navParams.get('artwork');

    let utenteCollection=this.db.collection<any>('/Utenti', ref => {return ref.where("username", "==",localStorage.getItem("username"))});
    this.utenteObservable= utenteCollection.valueChanges();
    this.utenteObservable.map(val=>{
      this.opereArray=[];
      let opere=val[0].like;
      for(let o of opere)
      {
        if(o.titolo==this.artwork.id)
        {
          this.liked=true;

        }
      }
    }).subscribe();


    //this.artwork= new Artwork("La Nascita di Venere","1400", "descrizione gioconda", "Michelangelo Buonarroti", "Neoclassicismo", 0, "Museo del Louvre", "Firenze", "pittura","piccola", null,null)




    let edificioCollectionUbicazione=this.db.collection<Artwork>('/Opere', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    /*let pitturaCollectionUbicazione=this.db.collection<Artwork>('/Pittura', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    let sculturaCollectionUbicazione=this.db.collection<Artwork>('/Scultura', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    let monumentoCollectionUbicazione=this.db.collection<Artwork>('/Monumento', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});*/

    this.createArray(edificioCollectionUbicazione,this.opereArrayUbicazione);
    /* this.createArray(pitturaCollectionUbicazione,this.opereArrayUbicazione);
     this.createArray(sculturaCollectionUbicazione,this.opereArrayUbicazione);
     this.createArray(monumentoCollectionUbicazione,this.opereArrayUbicazione);*/

    let edificioCollectionPeriodo=this.db.collection<Artwork>('/Opere', ref => {return ref.where("periodo", "==",this.artwork.periodo)});
    /*let pitturaCollectionPeriodo=this.db.collection<Artwork>('/Pittura', ref => {return ref.where("periodo", "==",this.artwork.periodo)});
    let sculturaCollectionPeriodo=this.db.collection<Artwork>('/Scultura', ref => {return ref.where("periodo", "==",this.artwork.periodo)});
    let monumentoCollectionPeriodo=this.db.collection<Artwork>('/Monumento', ref => {return ref.where("periodo", "==",this.artwork.periodo)});*/

    this.createArray(edificioCollectionPeriodo,this.opereArrayPeriodo);
    /* this.createArray(pitturaCollectionPeriodo,this.opereArrayPeriodo);
     this.createArray(sculturaCollectionPeriodo,this.opereArrayPeriodo);
     this.createArray(monumentoCollectionPeriodo,this.opereArrayPeriodo);*/


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoInformationPage');
  }

  createArray(collection: AngularFirestoreCollection<Artwork>, opereArray: Array<Artwork>) {
    this.opereObservable= collection.valueChanges();
    this.opereObservable.map(val => {
      for (let opera of val) {
        if(opera.titolo!=this.artwork.titolo)
          opereArray.push(new Artwork(opera.titolo, opera.anno, opera.descrizione,opera.artista, opera.periodo, opera.scansioni, opera.ubicazione, opera.ubicazione_citta, opera.tipologia, opera.dimensioni, opera.img, opera.img_prev,opera.id));
      }

    })      .subscribe(val => console.log(val));
  }



  like(){
    if(this.liked==false) {
      this.liked = true;
      let likeTMP=[{"titolo":this.artwork.id,"tipologia":this.artwork.tipologia}];
      this.db.collection("/Utenti").doc(localStorage.getItem("username")).update({like: firestore.FieldValue.arrayUnion({"titolo":this.artwork.id,"tipologia":this.artwork.tipologia})});
    }
    else if(this.liked==true){
      this.liked=false;
      this.db.collection("/Utenti").doc(localStorage.getItem("username")).update({like: firestore.FieldValue.arrayRemove({"titolo":this.artwork.id,"tipologia":this.artwork.tipologia})});
    }

  }
  showDetailsPhoto(opera)
  {
    this.navCtrl.push(PhotoInformationPage, {"artwork": opera});
  }





  goToMaps() {

    let location:string = this.artwork.ubicazione;
    let geo: any = this.geolocation;
    let nav: any = this.launchNavigator;
    let alertControl = this.alertCtrl;

    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
      if(enabled){
        geo.getCurrentPosition().then(position =>{
          let options: LaunchNavigatorOptions = {

            start: position.coords.latitude + ','+ position.coords.longitude
          };

          nav.navigate(location, options)
            .then(
              success => alert("navigatore lanciato"),
              error => alert("navigatore non funzionante")
            );

        },error=>{
          let messageAlert = alertControl.create({
            title: 'Avviso:',
            buttons: ['OK'],
            cssClass: 'custom-alert',
            message: 'Hei! Per poter utilizzare il navigatore ho bisogno del permesso.'
          });
          messageAlert.present();

        });
      }

      else{
        let messageAlert = alertControl.create({
          title: 'Avviso:',
          buttons: ['OK'],
          cssClass: 'custom-alert',
          message: 'Hei! Per utilizzare la mappa hai bisogno di attivare la localizzazione'
        });
        messageAlert.present();

      }


    }, function(error){
      alert("Errore nella valutazione del GPS: "+error);
    });


  }


}
