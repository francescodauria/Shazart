import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  utente:string;
  constructor() {
  this.utente=localStorage.getItem("utente");
  }
}
