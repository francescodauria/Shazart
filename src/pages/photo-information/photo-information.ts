import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

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
  private latitude:number;
  private longitude:number;
  liked:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator, private geolocation: Geolocation) {
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

  goToMaps(){


    this.geolocation.getCurrentPosition().then(position =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },error=>{
      console.log('error',error);
    });


    let options: LaunchNavigatorOptions = {
      start: ""+this.latitude+","+this.longitude
      //start:"posizione attuale"
    };

    this.launchNavigator.navigate(this.locazione, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );


  }
}
