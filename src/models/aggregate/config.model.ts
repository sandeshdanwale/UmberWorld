export class Config {
   	
   	type: string;
	sqft: number;
	quantity: number;
	posession: string;
	basePrice: string;
  
	constructor(data: any) {
	    this.type = data.type;
	    this.sqft = data.sqft;
	    this.quantity = data.quantity;
	    this.posession = data.posession;
	    this.basePrice = data.basePrice;
    }

}
