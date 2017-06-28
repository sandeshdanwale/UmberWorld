import { Amenity } from './amenity.model';
import * as _ from 'lodash';

export class Amenities {
   	
   	amenities: Array<Amenity> = [];
  	amenityId: string;
  	
	constructor(data: any) {
		this.amenityId = data.amenityId;
	    _.forEach(data.amenities, (a) => {
	    	this.amenities.push(new Amenity(a));
	    })
    }

}
