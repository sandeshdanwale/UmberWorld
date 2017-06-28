import { CityId, AggregateRoot, Address } from './aggregate.model';

export class Detail implements AggregateRoot<CityId> {
  id: CityId;

  constructor(data: any) {
    this.id = new CityId(data.id);
  }

}
