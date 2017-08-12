import { Component, Input, OnChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { City, User } from '../../models';
import { CityAutocompletePage } from '../city-autocomplete/city-autocomplete';
import { UserService, PropertyService } from '../../services';
import * as defaultProperty from '../../actions/defaultProperty.action';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarPage implements OnChanges {
  
  @Input() cities: City[];
  @Input() user: User;

  private selectedCity: City;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController,
    private userService: UserService,
    private propertyService: PropertyService,
    private store: Store<fromRoot.State>
    ) {
    
  }

  ngOnChanges(changes) {
    this.selectedCity = this.user ? this.user.preference.city : undefined;
    if (changes.user) {
      let prevUser = changes.user.previousValue;
      let curUser = changes.user.currentValue;
        let prevCity =  prevUser && prevUser.preference && prevUser.preference.city 
          ? prevUser.preference.city.id.registrationId : '';
        let curCity =  curUser && curUser.preference && curUser.preference.city 
          ? curUser.preference.city.id.registrationId : '';
        if (prevCity !== curCity && prevCity) {
          let city = curUser.preference.city;
          this.handleChange(city);
        }
    }
  }

  private handleChange(city: City) {
    let cityId = city.id.registrationId;
    Observable.from(
            this.propertyService.getFeaturedProperties(cityId)
          ).subscribe(data => {
            let defaultProperties = data ? data.slice(0, 4) : null;
            this.store.dispatch(new defaultProperty.LoadSuccessAction(defaultProperties));
          });
  }
  
  showAddressModal () {
    let modal = this.modalCtrl.create(CityAutocompletePage);
    modal.onDidDismiss((selectedCity: City) => {
      this.selectedCity = selectedCity;
      this.userService.setCity(this.user, selectedCity)
      .subscribe(data => {
        this.userService.updateUserPreference(data);
      })
    });
    modal.present();
  }
}
