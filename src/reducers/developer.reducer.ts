import { Developer } from '../models/aggregate/developer.model';
import * as developer from '../actions/developer.action';
import { Observable } from 'rxjs';
import * as _ from 'lodash'; 

export interface State {
  loaded: boolean;
  entities: Developer[];
};

const initialState: State = {
  loaded: false,
  entities: null
};

export function reducer(state = initialState, action: developer.Actions) {
  switch (action.type) {
    case developer.ActionTypes.LOAD:
      console.log('STORE:umber.developer/DEVELOPER_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    case developer.ActionTypes.UPDATE_DEVELOPER_DETAIL:
      console.log('STORE:umber.developer/UPDATE_DEVELOPER_DETAIL');
      let entities = _.map(state.entities, (d) => {
          if (d.id.registrationId === _.get(action, 'payload.id.registrationId')) {
            return _.merge(action.payload, d);
          }
          return d;
        });
      return {
        loaded: true,
        entities: entities
      };
    case developer.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.developer/DEVELOPER_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    default:
      return state;
  }

}

export function getDeveloperEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}