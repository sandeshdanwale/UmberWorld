import { LandmarkId, CityId, AggregateRoot, Address } from './aggregate.model';
import { Developer } from './developer.model';

export class Landmark implements AggregateRoot<LandmarkId> {
   	
   	id: LandmarkId;
   	cityId: CityId
   	rank: number;
	name: string;
	featured: boolean;
	developers: Array<Developer>;
    propertyCount: number;

	constructor(data: any) {
		let id = data.id ? data.id.registrationId : data.landmarkId.registrationId;
	    this.id = new LandmarkId(id);
	    this.name = data.name;
	    this.rank = data.rank;
	    this.featured = data.featured;
	    this.developers = data.developers;
	    this.propertyCount = data.propertyCount;
    }

}
