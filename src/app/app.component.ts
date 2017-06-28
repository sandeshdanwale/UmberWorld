import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform, MenuController, Nav } from 'ionic-angular';
import '../rxjs-operators';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AggregationService } from '../services/aggregation.service';
import { UiService } from '../services/ui.service';
import { UserService } from '../services/user.service';
import { User } from '../models/aggregate/user.model';
import { Panel } from '../models/aggregate/ui.model';


@Component({
  templateUrl: 'app.html'
})
export class UmberWorldApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
