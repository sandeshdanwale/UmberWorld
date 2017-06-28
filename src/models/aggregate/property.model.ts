import { PropertyId, DeveloperId, AggregateRoot, Address } from './aggregate.model';
import { Configs } from './configs.model';
import { Amenities } from './amenities.model';
import * as _ from 'lodash';

export class Property implements AggregateRoot<PropertyId> {
   	
   	id: PropertyId;
   	developerId: DeveloperId;
   	developerName: string;
   	cityName: string;
	name: string;
	description: string;
	featured: boolean;
	addresses: Array<Address>;
	configs: Configs;
	amenities: Amenities;
  
	constructor(data: any) {
	    this.id = new PropertyId(data.id.registrationId);
	    this.name = data.name;
	    this.description = data.description;
	    this.featured = data.featured;
	    this.developerName = data.developerName;
	    this.cityName = data.cityName;
	    this.addresses = [];
	    _.each(data.addresses, (address) => this.addresses.push(new Address(address)));
	    this.configs = data.configs ? new Configs(data.configs) : null;
	    this.amenities = data.amenities ? new Amenities(data.amenities) : null;
    }

}
