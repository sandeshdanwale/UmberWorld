import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import '../rxjs-operators';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CityAutocompletePage } from '../pages/city-autocomplete/city-autocomplete';
import { NavbarPage } from '../pages/navbar/navbar';
import { PropertyPage } from '../pages/property/property';
import { PropertyListPage } from '../pages/property-list/property-list';
import { PropertyAutocompletePage } from '../pages/property-autocomplete/property-autocomplete';
import { UmberAutocompletePage } from '../pages/umber-autocomplete/umber-autocomplete';

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
      { title: 'Home', component: HomePage },
      { title: 'CityAutocompletePage', component: CityAutocompletePage },
      { title: 'NavbarPage', component: NavbarPage },
      { title: 'PropertyPage', component: PropertyPage },
      { title: 'PropertyListPage', component: PropertyListPage },
      { title: 'PropertyAutocompletePage', component: PropertyAutocompletePage },
      { title: 'UmberAutocompletePage', component: UmberAutocompletePage }
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
