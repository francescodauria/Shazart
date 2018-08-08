import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Artwork} from "../../app/models/artwork";

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
  public artwork:Artwork;
  liked:boolean=false;

  constructor(private alertCtrl: AlertController,private diagnostic: Diagnostic,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
    this.artwork=this.navParams.get('artwork');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoInformationPage');
  }


  like(){
    if(this.liked==false)
      this.liked=true;
    else if(this.liked==true)
      this.liked=false;

  }
  showDetailsPhoto()
  {
    this.navCtrl.push(PhotoInformationPage);
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

