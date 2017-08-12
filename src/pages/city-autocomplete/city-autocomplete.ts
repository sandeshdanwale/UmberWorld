import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';
import { CityService } from '../../services';
import * as _ from 'lodash';

@Component({
  selector: 'city-autocomplete',
  templateUrl: './city-autocomplete.html'
})

export class CityAutocompletePage {
  autocompleteItems;
  autocomplete;

  constructor (
    public viewCtrl: ViewController,
    private zone: NgZone,
    private cityService: CityService
  ) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.cityService.getCities(_.toLower(this.autocomplete.query))
      .subscribe((cities) => {
        me.autocompleteItems = []; 
        me.zone.run(() => {
          cities.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        });
    });
  }
}
