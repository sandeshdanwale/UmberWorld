import { Injectable, Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { HttpService } from './http.service'
import { Http, URLSearchParams } from '@angular/http';
import * as fromRoot from '../reducers';
import { City } from '../models/aggregate/city.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class CityService {

	BASE_URL: string = location.hostname === 'localhost' ? 'api' : 'api';
    city: Observable<City[]>;
    constructor(
        private http: HttpService,
        private store: Store<fromRoot.State>
    ) {
        this.city = store.let(fromRoot.getCityEntities);
    }

    public getCities(searchString: string): Observable<any> {
        let url: string = `${this.BASE_URL}/city/search/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getAllCities(): Observable<any> {
        let url: string = `${this.BASE_URL}/city/all`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getCityDetails(id: string): Observable<any> {
        let url: string = `${this.BASE_URL}/city/details/${id}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getFeaturedCities(): Observable<any> {


        let url: string = `${this.BASE_URL}/city/featuredCities`; 
        return this.http.get(url)
        		.map(this.extractData)
                //.catch(this.handleError);
    }

    private extractData(res: Response) {
        let data;
        try {
            //if (!res._body) {
                //return data;
            //}
    	    let _data = res.json();
            return _data;
            /*if (!_data || typeof _data == 'undefined' || (Object.prototype.toString.call(_data) === '[object Array]' && !_data.length)) {
                return data;
            }
            if (_data.length > 0) {
                data = _.map(_data, (p) => new City(p));
            } else {
                data = new City(_data);
            }
            return data;*/
        } catch (e) {
            return [{"locationId":{"registrationId":"1"},"rank":1,"name":"mumbai","primary":true,"featured":true},{"locationId":{"registrationId":"9"},"rank":9,"name":"pune","primary":true,"featured":true},{"locationId":{"registrationId":"3"},"rank":3,"name":"bangalore","primary":true,"featured":true},{"locationId":{"registrationId":"5"},"rank":5,"name":"hyderabad","primary":true,"featured":true}]
        }
  	}

  	private handleError (error: Response | any) {
	    let errMsg: string;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body.error || JSON.stringify(body);
	      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    //console.log(errMsg);
	    //return Observable.throw(errMsg);
	    let res = [{"locationId":{"registrationId":"1"},"rank":1,"name":"mumbai","primary":true,"featured":true},{"locationId":{"registrationId":"9"},"rank":9,"name":"pune","primary":true,"featured":true},{"locationId":{"registrationId":"3"},"rank":3,"name":"bangalore","primary":true,"featured":true},{"locationId":{"registrationId":"5"},"rank":5,"name":"hyderabad","primary":true,"featured":true}]
    	return res;//Observable.throw(res);
  	}
}