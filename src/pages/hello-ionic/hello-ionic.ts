import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";
import {Artwork} from "../../app/models/artwork";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  utente:string;
  public a:Artwork;
  constructor(public navParams: NavParams) {
  this.utente=localStorage.getItem("utente");
  this.a=navParams.get('opera');

  }
}
