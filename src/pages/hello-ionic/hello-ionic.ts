import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  utente:string;

  constructor(public navParams: NavParams) {
  this.utente=localStorage.getItem("utente");
  }
}
