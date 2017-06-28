import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { DBModule, Database } from '@ngrx/db';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UmberWorldApp } from './app.component';
import { OrderByPipe, ActiveLandmarkPipe, ActiveDeveloperPipe, ActivePropertyPipe, 
    DisplayViewport, DisplayConfig } from '../pipes/generic.pipe';
import { HomePage } from '../pages/home/home';
//import { InfiniteScroll } from './components/shared/infinite-scroll/infinite-scroll';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { DeveloperService } from '../services/developer.service';
import { PropertyService } from '../services/property.service';
import { CityService } from '../services/city.service';
import { UiService } from '../services/ui.service';
import { LandmarkService } from '../services/landmark.service';
import { AggregationService } from '../services/aggregation.service';
import { TagService } from '../services/tag.service';
import { CacheService } from '../services/cache.service';
import { UtilService } from '../services/util.service';
import { reducer } from '../reducers';

@NgModule({
  declarations: [
    UmberWorldApp,
    HomePage,
    OrderByPipe, ActiveLandmarkPipe, ActiveDeveloperPipe, ActivePropertyPipe, 
    DisplayViewport, DisplayConfig
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(UmberWorldApp),
    StoreModule.provideStore(reducer)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UmberWorldApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService, UserService, DeveloperService, CityService, LandmarkService, 
    AggregationService, CacheService, PropertyService, UiService, TagService, UtilService
  ]
})
export class AppModule {}
