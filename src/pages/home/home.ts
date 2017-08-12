import { Component, OnInit, OnChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { City, User, Property } from '../../models';
import { CityService, UserService, AggregationService, PropertyService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { CityAutocompletePage } from '../city-autocomplete/city-autocomplete';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnChanges {
  
  cities: Observable<City[]>;
  user: Observable<User>;
  defaultProperty: Observable<Property[]>;
  globalProperty: Observable<Property[]>;
  defaulfPropertyList: Property[];
  property: Observable<Property[]>;
  query;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cityService: CityService,
    private userService: UserService,
    private aggregationService: AggregationService,
    private propertyService: PropertyService
  ) {
    this.cities = this.cityService.city;
    this.user = this.userService.user;
    this.defaultProperty = this.propertyService.defaultProperty;
    this.globalProperty = this.propertyService.globalProperty;
    this.property = this.propertyService.property;
    
  }

  public ngOnInit() {
    this.aggregationService.load();
  }

  ngOnChanges(changes) {
  }
  
}
