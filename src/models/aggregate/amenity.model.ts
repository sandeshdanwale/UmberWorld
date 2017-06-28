import { Feature } from './feature.model';
import * as _ from 'lodash';

export class Amenity {
   	
   	type: string;
	features: Array<Feature> = [];
  
	constructor(data: any) {
	    this.type = data.type;
	    _.forEach(data.features, (f) => {
	    	this.features.push(new Feature(f));
	    })
    }

}
