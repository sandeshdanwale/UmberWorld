import { Configs } from './aggregate/configs.model';

export class DisplayProperty {
   	
   	public address: string;
    public configs: string;
    public price: string;
    public name: string;
    public description: string;
    public developerName: string;
  
	constructor(data?: any) {
    if (data) {
	    this.address = data.address
	    this.configs = data.configs;
	    this.price = data.price;
	    this.name = data.name;
      this.description = data.description;
	    this.developerName = data.developerName;
    }
  }

}
