export interface AggregateId {
  asString(): string;
}

export class CityId implements AggregateId {
  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }
  
  public asString(): string {
    return this.registrationId.toString();
  }
}

export class LandmarkId implements AggregateId {
  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }
  
  public asString(): string {
    return this.registrationId.toString();
  }
}

export class UserId implements AggregateId {
  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }
  
  public asString(): string {
    return this.registrationId.toString();
  }
}

export class DetailId implements AggregateId {
  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }

  public asString(): string {
    return this.registrationId.toString();
  }
}

export class PropertyId implements AggregateId {

  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }

  public asString(): string {
    return this.registrationId.toString();
  }
}

export class DeveloperId implements AggregateId {

  public registrationId: string;

  constructor(registrationId: string) {
    this.registrationId = registrationId;
  }

  public asString(): string {
    return this.registrationId.toString();
  }
}

export const AddressType = {
  HOME: 'HOME'
}

export interface IAddress {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    landmarkId: LandmarkId;
    state: string;
    postalCode: string;
    country: string;
    type: string;
    latitude: string;
    longitude: string;
}

export class Address implements IAddress {

    line1: string;
    line2: string;
    line3: string;
    city: string;
    landmarkId: LandmarkId;
    state: string;
    postalCode: string;
    country: string;
    type: string;
    latitude: string;
    longitude: string;

    constructor(address: any) {
        this.line1 = address.line1;
        this.line2 = address.line2;
        this.line3 = address.line3;
        this.city = address.city;
        this.landmarkId = address.landmarkId;
        this.state = address.state;
        this.postalCode = address.postalCode;
        this.country = address.country;
        this.type = address.type;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
    }

}

export const PhoneType = {
  HOME: 'HOME',
  OFFICE: 'OFFICE', 
  CELL: 'CELL',
  EMERGENCY: 'EMERGENCY',
  HOMEPHONE: 'HOMEPHONE'
}

export interface IPhone {
    type: string;
    phoneNumber: string;
}

export class Phone implements IPhone {

    type: string;
    phoneNumber: string;

    constructor(phone: any) {
        this.type = phone.type;
        this.phoneNumber = phone.phoneNumber;
    }

}

export interface AggregateRoot<T extends AggregateId> {
  id: T;
}

export interface IUi {
  panels: Array<string>;
}

