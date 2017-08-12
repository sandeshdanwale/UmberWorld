import { Injectable, Component } from '@angular/core'
import { HttpService } from './http.service';
import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Developer } from '../models/aggregate/developer.model';
import { Response } from '@angular/http';

@Injectable()
export class DeveloperService {

	BASE_URL: string = location.hostname === 'localhost' ? 'api' : 'api';
    developer: Observable<Developer[]>;
    globalDeveloper: Observable<Developer[]>;
    constructor(
        private http: HttpService,
        private utilService: UtilService,
        private store: Store<fromRoot.State>
    ) {
        this.developer = store.let(fromRoot.getDeveloperEntities);
        this.globalDeveloper = store.let(fromRoot.getGlobalDeveloperEntities);
    }

    public getDevelopers(cityId: string = '9', searchString: string): Observable<Developer[]> {
        if (this.utilService.isNull(searchString)) {
            return this.getFeaturedDevelopers(cityId);
        }
        let url: string = `${this.BASE_URL}/developer/search/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getDevelopersByLandmarkId(cityId: string, searchString: string, landmarkId: string): Observable<Developer[]> {
        if (this.utilService.isNull(searchString)) {
            searchString = 'XXXXX';
        }
        let url: string = `${this.BASE_URL}/developer/search/byLandmark/${landmarkId}/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getDeveloperDetails(id: string): Observable<Developer> {
        let url: string = `${this.BASE_URL}/developer/details/${id}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getTopDevelopers(): Observable<Developer[]> {


        let url: string = `${this.BASE_URL}/developer/topDevelopers`;
        return this.http.get(url)
        		.map(this.extractData)
                .catch(this.handleError);
    }

    public getFeaturedDevelopers(cityId: string): Observable<Developer[]> {


        let url: string = `${this.BASE_URL}/developer/featuredDevelopersByCity?cityId=${cityId}`;
        return this.http.get(url)
                .map(this.extractData)
                .catch(this.handleError);
    }

    public getGlobalFeaturedDevelopers(): Observable<Developer[]> {


        let url: string = `${this.BASE_URL}/developer/globalFeaturedDevelopers`;
        return this.http.get(url)
                .map(this.extractData)
                .catch(this.handleError);
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
                data = _.map(_data, (p) => new Developer(p));
            } else {
                data = new Developer(_data);
            }
            return data;*/
        } catch (e) {
            console.log(e)
            return [{
                    developerName: "shiv"
                }, {
                    developerName: "mahindra"
                }, {
                    developerName: "sobha"
                }, {
                    developerName: "shubh-laxmi"
                }, {
                    developerName: "radius"
                }]
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
	    console.error(errMsg);
	    //return Observable.throw(errMsg);
	    let res = [{
                    developerName: "shiv"
                }, {
                    developerName: "mahindra"
                }, {
                    developerName: "sobha"
                }, {
                    developerName: "shubh-laxmi"
                }, {
                    developerName: "radius"
                }]
    	Observable.throw(res);
  	}
}