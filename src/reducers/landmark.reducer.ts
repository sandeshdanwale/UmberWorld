import { Landmark } from '../models/aggregate/landmark.model';
import * as landmark from '../actions/landmark.action';
import { Observable } from 'rxjs';
import * as _ from 'lodash'; 

export interface State {
  loaded: boolean;
  entities: Landmark[];
};

const initialState: State = {
  loaded: false,
  entities: null
};

export function reducer(state = initialState, action: landmark.Actions) {
  switch (action.type) {
    case landmark.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.landmark/LANDMARK_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    case landmark.ActionTypes.UPDATE_LANDMRK_DETAIL:
      console.log('STORE:umber.landmark/UPDATE_LANDMRK_DETAIL');
      let entities = _.map(state.entities, (l) => {
          if (l.id.registrationId === _.get(action, 'payload.id.registrationId')) {
            return _.merge(action.payload, l);
          }
          return l;
        });
      return {
        loaded: true,
        entities: entities
      };
    default:
      return state;
  }

}
/**/
export function getLandmarkEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
