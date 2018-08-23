import { Component } from '@angular/core';
import {Nav, NavController, NavParams} from "ionic-angular";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  utente:string;

  constructor(public navParams: NavParams, public nav:NavController) {
  this.utente=localStorage.getItem("utente");
  //alert("prima" +this.nav.length());
  //this.nav.popAll();
  //alert("dopo" +this.nav.length());
  }
}
