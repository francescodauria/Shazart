import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, LoadingController, Events} from 'ionic-angular';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  // You can get this data from your API. This is a dumb data for being an example.
  public user_data = {
    profile_img: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/13937764_10208899139974056_7157026056838053495_o.jpg?_nc_cat=0&oh=5298fb6f9d840a6c35597aed49540982&oe=5BDFA0EF',
    name_surname: 'Simone Faiella',
    username: 'simone',
    website: 'http://faiellasimone.altervista.org',
    description: 'Studente di informatica',
    email: 'simone.faiella@hotmail.com',
    phone: '',
    gender: 'maschio'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public events:Events
  ) {

  }

  updateProfile() {
    let loader = this.loadingCtrl.create({
      duration: 200
    });
    loader.present().then( () => this.navCtrl.pop() ); // Get back to profile page. You should do that after you got data from API
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
