import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhotoInformationPage} from "../photo-information/photo-information";


/**
 * Generated class for the LastScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-last-scan',
  templateUrl: 'last-scan.html',
})
export class LastScanPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastScanPage');
  }

  showDetails()
  {
    this.navCtrl.push(PhotoInformationPage);
  }



}
