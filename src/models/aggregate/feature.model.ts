export class Feature {
   	
   	entity: string;
	specification: string;
  
	constructor(data: any) {
	    this.entity = data.entity;
	    this.specification = data.specification;
    }

}
