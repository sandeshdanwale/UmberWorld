import { DeveloperId, AggregateRoot, Address, Phone } from './aggregate.model';
import { City } from './city.model';
import { Property } from './property.model';
import * as _ from 'lodash';

export class Developer implements AggregateRoot<DeveloperId> {
   	
   	id: DeveloperId;
   	name: string;
	description: string;
	featured: boolean;
    addresses: Array<Address>;
  	cities: Array<City>;
  	phones: Array<Phone>;
  	properties: Array<Property>;
    numberOfProjects: number;
    email: string;

	constructor(data: any) {
	    this.id = new DeveloperId(data.id.registrationId);
	    this.name = data.name;
	    this.description = data.description;
	    this.featured = data.featured;
	    this.addresses = [];
	    _.each(data.addresses, (address) => this.addresses.push(new Address(address)));
	    this.cities = [];
	    _.each(data.cities, (city) => this.cities.push(new City(city)));
	    this.phones = [];
	    _.each(data.phones, (phone) => this.phones.push(new Phone(phone)));
	    this.properties = [];
	    _.each(data.properties, (property) => this.properties.push(new Property(property)));
	    this.numberOfProjects = data.numberOfProjects;
	    this.email = data.email;
    }

}
