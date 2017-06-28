import { Developer } from '../models/aggregate/developer.model';
import * as globalDeveloper from '../actions/globalDeveloper.action';
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

export function reducer(state = initialState, action: globalDeveloper.Actions) {
  switch (action.type) {
    case globalDeveloper.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.globalDeveloper/DEFAULT_PROPERTY_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    case globalDeveloper.ActionTypes.UPDATE_DEVELOPER_DETAIL:
      console.log('STORE:umber.globalDeveloper/UPDATE_DEVELOPER_DETAIL');
      return {
        loaded: true,
        entities: _.differenceBy(state.entities, [action.payload], (p) => p.id.registrationId).concat(action.payload)
      };
    default:
      return state;
  }

}

export function getGlobalDeveloperEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
