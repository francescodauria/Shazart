import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {PhotoInformationPage} from "../photo-information/photo-information";

@Component({
  selector: 'page-preferiti',
  templateUrl: 'preferiti.html'
})
export class PreferitiPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  showDetails()
  {
    this.navCtrl.push(PhotoInformationPage);
  }
}
