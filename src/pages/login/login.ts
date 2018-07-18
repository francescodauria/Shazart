import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HelloIonicPage} from "../hello-ionic/hello-ionic";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
    this.menu.enable(false);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.navCtrl.setRoot(HelloIonicPage);
    this.menu.enable(true);
  }
}
