import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {Http} from "@angular/http";

/*
  Generated class for the GoogleCloudVisionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: Http) {
    console.log('Hello GoogleCloudVisionServiceProvider Provider');
  }
  getInformation(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": ''+base64Image
          },
          "features": [

            {
              "type": "LABEL_DETECTION"
            },
            {
              "type": "WEB_DETECTION"
            }
          ]
        }
      ]
    }
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body)
  }

}
