export class Tag {
   	
   	name: string;
	type: string;
	id: string;
  
	constructor(data: any) {
	    this.name = data.name;
	    this.type = data.type;
	    this.id = data.id;
    }

}
