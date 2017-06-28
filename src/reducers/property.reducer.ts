import { Property } from '../models/aggregate/property.model';
import * as property from '../actions/property.action';
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

export function reducer(state = initialState, action: property.Actions) {
  switch (action.type) {
    case property.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.property/PROPERTY_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    case property.ActionTypes.UPDATE_PROPERTY_DETAIL:
      console.log('STORE:umber.property/UPDATE_PROPERTY_DETAIL');
      let entities = _.map(state.entities, (e) => {
          if (e.id.registrationId === _.get(action, 'payload.id.registrationId')) {
            return _.merge(action.payload, e);
          }
          return e;
        })
      //_.differenceBy(state.entities, [action.payload], (p) => p.id.registrationId).concat(action.payload)
      return {
        loaded: true,
        entities: entities
      };
    default:
      return state;
  }

}

export function getPropertyEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
