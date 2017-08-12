import { Injectable, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import { User } from '../models/aggregate/user.model';
import * as user from '../actions/user.action';
import { City } from '../models/aggregate/city.model';
import { Preference } from '../models/aggregate/preference.model';
import { Response } from '@angular/http';

@Injectable()
export class UserService {

	BASE_URL: string = location.hostname === 'localhost' ? 'api' : 'api';

    user: Observable<User>;
    constructor(
        private http: HttpService,
        private store: Store<fromRoot.State>
    ) {
        this.user = store.let(fromRoot.getUserEntities);
    }

    public getUserPreferences(userId: string): Observable<any> {
        
        let url: string = `${this.BASE_URL}/userPreference?userId=${userId}`;
        return this.http.get(url)
        		.map(this.extractData);
                //.catch(this.handleError);
    }

    public setCity(user: User, city: City): Observable<any> {
        
        let userId = user.id.registrationId;
        let cityId = city.id.registrationId;
        let url: string = `${this.BASE_URL}/userPreference/updateCity?userId=${userId}&cityId=${cityId}`;
        return this.http.post(url, null)
                .map(this.extractData)
                //.catch(this.handleError);
    }

    public updateUserPreference(serverPreference: any): void {
        let preference = new Preference({city :
            new City(serverPreference.city)
        });
        let serverUser = new User({
          id: serverPreference.userId.registrationId,
          preference: preference
        })
        this.store.dispatch(new user.LoadSuccessAction(serverUser));
    }

    private extractData(res: Response) {
        let data;
        try {
    	   data = res.json();
           return data;
        } catch (e) {
            return {"primaryLocations":[{"locationId":{"registrationId":"1"},"rank":1,"name":"mumbai","primary":true},{"locationId":{"registrationId":"9"},"rank":9,"name":"pune","primary":true},{"locationId":{"registrationId":"3"},"rank":3,"name":"bangalore","primary":true},{"locationId":{"registrationId":"5"},"rank":5,"name":"hyderabad","primary":true}],"secondaryLocations":[{"locationId":{"registrationId":"26"},"rank":26,"name":"nashik","primary":false},{"locationId":{"registrationId":"2"},"rank":2,"name":"delhi","primary":false}],"selectedLocation":{"locationId":{"registrationId":"9"},"rank":9,"name":"pune","primary":true}};
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
    	return Observable.throw(errMsg);
  	}
}