import { City } from './city.model';

export class Preference {
   	
   	city: City;
  
	constructor(data: any) {
	    this.city = data.city;
	    
    }

}
