import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import  {TabsPage} from "../pages/tabs/tabs";

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { PreferitiPage } from '../pages/preferiti/preferiti';
import {ProfiloPage} from "../pages/profilo/profilo";
import {LastScanPage} from "../pages/last-scan/last-scan";
import {TopScanPage} from "../pages/top-scan/top-scan";
import {ScanPage} from "../pages/scan/scan";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {PhotoInformationPage} from "../pages/photo-information/photo-information";
import {LoginPage} from "../pages/login/login";
import {IonicImageViewerModule} from "ionic-img-viewer";
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {environment} from "../environment/environment";
import {Network} from "@ionic-native/network";


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    PreferitiPage,
    TabsPage,
    ProfiloPage,
    LastScanPage,
    TopScanPage,
    ScanPage,
    PhotoInformationPage,
    LoginPage
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{mode:'ios'}),
    IonicImageViewerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    PreferitiPage,
    TabsPage,
    ProfiloPage,
    LastScanPage,
    TopScanPage,
    ScanPage,
    PhotoInformationPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleCloudVisionServiceProvider,
    Geolocation,
    Diagnostic,
    LaunchNavigator,
    Network
  ]
})
export class AppModule {}
