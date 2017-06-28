import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { CityAutoCompletePage } from './city-autocomplete';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  location;

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {
    
  }
  
  // showAddressModal () {
  //   let modal = this.modalCtrl.create(CityAutoCompletePage);
  //   let me = this;
  //   modal.onDidDismiss(data => {
  //     me.location = data;
  //   });
  //   modal.present();
  // }
}
