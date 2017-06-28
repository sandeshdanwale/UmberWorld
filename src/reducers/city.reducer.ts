import { City } from '../models/aggregate/city.model';
import * as city from '../actions/city.action';
import { Observable } from 'rxjs';

export interface State {
  loaded: boolean;
  entities: City[];
};

const initialState: State = {
  loaded: false,
  entities: null
};

export function reducer(state = initialState, action: city.Actions) {
  switch (action.type) {
    case city.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.city/CITY_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    default:
      return state;
  }

}

export function getCityEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
