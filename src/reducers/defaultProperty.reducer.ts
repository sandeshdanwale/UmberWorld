import { Property } from '../models/aggregate/property.model';
import * as defaultProperty from '../actions/defaultProperty.action';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export interface State {
  loaded: boolean;
  entities: Property[];
};

const initialState: State = {
  loaded: false,
  entities: null
};

export function reducer(state = initialState, action: defaultProperty.Actions) {
  switch (action.type) {
    case defaultProperty.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.defaultProperty/DEFAULT_PROPERTY_LOADED');
      return {
        loaded: true,
        entities: [action.payload]
      };
    case defaultProperty.ActionTypes.UPDATE_PROPERTY_DETAIL:
      console.log('STORE:umber.defaultProperty/UPDATE_PROPERTY_DETAIL');
      return {
        loaded: true,
        entities: _.differenceBy(state.entities, [action.payload], (p) => p.id.registrationId).concat(action.payload)
      };
    default:
      return state;
  }

}

export function getDefaultPropertyEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
