import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

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
  public information:any;
  public foto:any;
  public locazione:string;
  private latitude:string;
  private longitude:string;
  liked:boolean=false;

  constructor(private diagnostic: Diagnostic,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
    this.information=this.navParams.get('information');
    this.locazione = "Galleria degli uffizi";
    this.foto='data:image/jpeg;base64,'+this.navParams.get('foto');
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

    let location:string = this.locazione;
    let geo: any = this.geolocation;
    let nav: any = this.launchNavigator;
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
          alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        });
      }

      else{
        alert("Hei! Per utilizzare la mappa hai bisogno di attivare la localizzazione.");
      }


    }, function(error){
      alert("Errore nella valutazione del GPS: "+error);
    });


  }


}

