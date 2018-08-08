import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Artwork} from "../../app/models/artwork";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

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
  liked:boolean=false;
  private opereObservable: Observable<Artwork[]>;
  public opereArray: Array<Artwork> =[];
  constructor(private alertCtrl: AlertController,private diagnostic: Diagnostic,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator,private db:AngularFirestore) {
    //this.artwork=this.navParams.get('artwork');



    this.artwork= new Artwork("La Nascita di Venere","1400", "descrizione gioconda", "Michelangelo Buonarroti", "Rinascimento", 0, "Museo del Louvre", "Firenze", "pittura","piccola", null,null)




    let edificioCollection=this.db.collection<Artwork>('/Edificio', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    let pitturaCollection=this.db.collection<Artwork>('/Pittura', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    let sculturaCollection=this.db.collection<Artwork>('/Scultura', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});
    let monumentoCollection=this.db.collection<Artwork>('/Monumento', ref => {return ref.where("ubicazione_citta", "==",this.artwork.ubicazione_citta)});

    this.createArrayUbicazione(edificioCollection);
    this.createArrayUbicazione(pitturaCollection);
    this.createArrayUbicazione(sculturaCollection);
    this.createArrayUbicazione(monumentoCollection);



  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoInformationPage');
  }

  createArrayUbicazione(collection: AngularFirestoreCollection<Artwork>) {
    this.opereObservable= collection.valueChanges();
    this.opereObservable.map(val => {
      for (let opera of val) {
        if(opera.titolo!=this.artwork.titolo)
        this.opereArray.push(new Artwork(opera.titolo, opera.anno, opera.descrizione,opera.artista, opera.periodo, opera.scansioni, opera.ubicazione, opera.ubicazione_citta, opera.tipologia, opera.dimensioni, opera.img, opera.img_prev));
      }

    })      .subscribe(val => console.log(val));
  }



  like(){
    if(this.liked==false)
      this.liked=true;
    else if(this.liked==true)
      this.liked=false;

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
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
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
