import { Component, NgZone, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { User, Property, Developer, Landmark } from '../../models';
import { PropertyService, DeveloperService, LandmarkService } from '../../services';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as defaultProperty from '../../actions/defaultProperty.action';

@Component({
  selector: 'umber-autocomplete',
  templateUrl: './umber-autocomplete.html'
})

export class UmberAutocompletePage {
  query: string;
  autocompleteItems;

  @Input() user: User;

  constructor (
    public viewCtrl: ViewController,
    private zone: NgZone,
    private propertyService: PropertyService,
    private developerService: DeveloperService,
    private landmarkService: LandmarkService,
    private store: Store<fromRoot.State>
  ) {
    this.autocompleteItems = [];
    this.query = '';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
     this.searchUmber(this.query || 'XXXXX')
      .subscribe(([developers, properties, landmarks]: [Developer[], Property[], Landmark[]]) => {
        me.autocompleteItems = []; 
        me.zone.run(() => {
          landmarks.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        });
    });

  }

  private searchUmber(searchString: string): Observable<[Developer[], Property[], Landmark[]]> {
    let _searchString: string = searchString ? searchString.toLowerCase().replace(/ /g, '') : '';
    let cityId = this.user.preference.city.id.registrationId;
    return Observable.combineLatest(
          this.developerService.getDevelopers(cityId, _searchString),
          this.propertyService.getProperties(cityId, _searchString),
          this.landmarkService.getLandmarks(cityId, _searchString)
      )
  }

}
