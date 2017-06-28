import { UserId, AggregateRoot } from './aggregate.model';
import { Preference } from './preference.model';

export class User implements AggregateRoot<UserId> {
   	
   	id: UserId;
   	preference: Preference;
  
	constructor(data: any) {
	    this.id = new UserId(data.id);
	    this.preference = data.preference;
	    
    }

}
