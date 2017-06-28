import { Config } from './config.model';

export class Configs {
   	
   	configs: Array<Config>;
  	configId: string;
  	
	constructor(data: any) {
		this.configId = data.configId;
	    this.configs = data.configs;
    }

}
