import { Injectable, Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { HttpService } from './http.service';
import { UtilService } from './util.service';
import { Http, URLSearchParams } from '@angular/http';
import * as fromRoot from '../reducers';
import { Property } from '../models/aggregate/property.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class PropertyService {

	BASE_URL: string = location.hostname === 'localhost' ? 'api' : 'api';
    property: Observable<Property[]>;
    defaultProperty: Observable<Property[]>;
    globalProperty: Observable<Property[]>;
    
    constructor(
        private http: HttpService,
        private utilService: UtilService,
        private store: Store<fromRoot.State>
    ) {
        this.property = store.let(fromRoot.getPropertyEntities);
        this.defaultProperty = store.let(fromRoot.getDefaultPropertyEntities)
        this.globalProperty = store.let(fromRoot.getGlobalPropertyEntities);
    }

    public getProperties(cityId: string = '9', searchString: string): Observable<Property[]> {
        if (this.utilService.isNull(searchString)) {
            return this.getFeaturedProperties(cityId);
        }
        let url: string = `${this.BASE_URL}/property/search/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getPropertiesByLandmark(cityId: string, searchString: string, landmarkId: string): Observable<Property[]> {
        if (this.utilService.isNull(searchString)) {
            searchString = 'XXXXX';
        }
        let url: string = `${this.BASE_URL}/property/search/byLandmark/${landmarkId}/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getPropertiesByDeveloper(cityId: string, searchString: string, developerId: string): Observable<Property[]> {
        if (this.utilService.isNull(searchString)) {
            searchString = 'XXXXX';
        }
        let url: string = `${this.BASE_URL}/property/search/byDeveloper/${developerId}/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getPropertiesByLandmarkAndDeveloper(cityId: string, searchString: string, landmarkId: string, developerId: string): Observable<Property[]> {
        if (this.utilService.isNull(searchString)) {
            searchString = 'XXXXX';
        }
        let url: string = `${this.BASE_URL}/property/search/byLandmarkAndDeveloper/${landmarkId}/${developerId}/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getNearByProperties(cityId: string, landmarkId: string): Observable<Property[]> {
        let url: string = `${this.BASE_URL}/property/search/nearByProperties/${landmarkId}/${cityId}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getPropertyDetails(id: string): Observable<Property> {
        let url: string = `${this.BASE_URL}/property/details/${id}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getAllPropertyDetails(id: string): Observable<Property> {
        let url: string = `${this.BASE_URL}/property/details/all/${id}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getFeaturedProperties(cityId: string): Observable<Property[]> {


        let url: string = `${this.BASE_URL}/property/featuredPropertiesByCity?cityId=${cityId}`; 
        return this.http.get(url)
        		.map(this.extractData)
                //.catch(this.handleError);
    }

    public getPropertiesWithDetails(cityId: string = '9', searchString: string): Observable<Property[]> {
       let url: string = `${this.BASE_URL}/property/search/details/${cityId}/${searchString}`; 
        return this.http.get(url)
                .map(this.extractData)
    }

    public getGlobalFeaturedProperties(): Observable<Property[]> {


        let url: string = `${this.BASE_URL}/property/globalFeaturedProperties`; 
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
                data = _.map(_data, (p) => new Property(p));
            } else {
                data = new Property(_data);
            }
            return data;*/
        } catch (e) {
            return [{
                    propertyName: "shiv",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
                }, {
                    propertyName: "mahindra",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
                }, {
                    propertyName: "sobha",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
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
	    //console.log(errMsg);
	    //return Observable.throw(errMsg);
	    let res = [{
                    propertyName: "shiv",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
                }, {
                    propertyName: "mahindra",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
                }, {
                    propertyName: "sobha",
                    desc: "Largest and only backward integrated real estate player in the country, Sobha Limited is a big name in the construction industry ..."
                }]
    	return res;//Observable.throw(res);
  	}
}