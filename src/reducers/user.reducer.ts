import { User } from '../models/aggregate/user.model';
import * as user from '../actions/user.action';
import { Observable } from 'rxjs';

export interface State {
  loaded: boolean;
  entities: User;
};

const initialState: State = {
  loaded: false,
  entities: null
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.LOAD_SUCCESS:
      console.log('STORE:umber.user/USER_LOADED');
      return {
        loaded: true,
        entities: action.payload
      };
    default:
      return state;
  }

}

export function getUserEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
