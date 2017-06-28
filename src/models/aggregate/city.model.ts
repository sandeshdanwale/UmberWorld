import { CityId, AggregateRoot, Address } from './aggregate.model';

export class City implements AggregateRoot<CityId> {
   	
   	id: CityId;
   	rank: number;
	name: string;
	primary: string;
	featured: boolean;
  
	constructor(data: any) {
		let id = data.id ? data.id.registrationId : data.cityId.registrationId
	    this.id = new CityId(id);
	    this.name = data.name;
	    this.rank = data.rank;
	    this.featured = data.featured;
	    this.primary = data.primary;
    }

}
