import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  liked:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.information=this.navParams.get('information');
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
}
