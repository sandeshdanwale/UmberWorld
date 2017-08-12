import { Component, NgZone, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { User } from '../../models/aggregate/user.model';
import { PropertyService } from '../../services';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as defaultProperty from '../../actions/defaultProperty.action';
import { Property } from '../../models/aggregate/property.model';

@Component({
  selector: 'property-autocomplete',
  templateUrl: './property-autocomplete.html'
})

export class PropertyAutocompletePage {
  query;

  @Input() user: User;

  constructor (
    private propertyService: PropertyService,
    private store: Store<fromRoot.State>
  ) {
  }

  updateSearch() {
    console.log(this.query)
    this.propertyService.getPropertiesWithDetails(this.user.preference.city.id.registrationId, _.toLower(this.query) || 'XXXXX')
    .subscribe((properties) => {
      let _defaultProperties = _.slice(
                                  _.map(properties, (d) => d && new Property(d)),
                                  0, 4);
      this.store.dispatch(new defaultProperty.LoadSuccessAction(_defaultProperties));    
    })
  }

}
