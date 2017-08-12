import { Injectable, Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { HttpService } from './http.service';
import { UtilService } from './util.service';
import { Http, URLSearchParams } from '@angular/http';
import * as fromRoot from '../reducers';
import { Landmark } from '../models/aggregate/landmark.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class LandmarkService {

	BASE_URL: string = location.hostname === 'localhost' ? 'api' : 'api';
    landmark: Observable<Landmark[]>;
    constructor(
        private http: HttpService,
        private utilService: UtilService,
        private store: Store<fromRoot.State>
    ) {
        this.landmark = store.let(fromRoot.getLandmarkEntities);
    }

    public getLandmarks(cityId: string = '9', searchString: string): Observable<Landmark[]> {
        if (this.utilService.isNull(searchString)) {
            return this.getFeaturedLandmarks(cityId);
        }
        let url: string = `${this.BASE_URL}/landmark/search/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getLandmarkDetails(id: string): Observable<Landmark> {
        let url: string = `${this.BASE_URL}/landmark/details/${id}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getFeaturedLandmarks(cityId: string): Observable<Landmark[]> {


        let url: string = `${this.BASE_URL}/landmark/featuredLandmarksByCity?cityId=${cityId}`; 
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
            // if (!_data || typeof _data == 'undefined' || (Object.prototype.toString.call(_data) === '[object Array]' && !_data.length)) {
            //     return data;
            // }
            // if (_data.length > 0) {
            //     data = _.map(_data, (p) => new Landmark(p));
            // } else {
            //     data = new Landmark(_data);
            // }
            // return data;
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