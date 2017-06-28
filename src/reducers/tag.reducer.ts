import { Tag } from '../models/aggregate/tag.model';
import * as tag from '../actions/tag.action';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export interface State {
  entities: Tag[];
};

const initialState: State = {
  entities: null
};

export function reducer(state = initialState, action: tag.Actions): State {
  switch (action.type) {
    case tag.ActionTypes.ADD_TAG:
      console.log('STORE:umber.tag/ADD_TAG');
      return {
        entities: _.slice(_.uniq(_.union(state.entities, [action.payload])), 0, 3)
      };
    case tag.ActionTypes.REMOVE_TAG:
      console.log('STORE:umber.tag/REMOVE_TAG');
      return {
        entities: _.filter(state.entities, (e) => !(e.type === action.payload.type && e.name === action.payload.name))
      };
    case tag.ActionTypes.REMOVE_ALL_TAG:
      console.log('STORE:umber.tag/REMOVE_ALL_TAG');
      return {
        entities: null
      };
    default:
      return state;
  }

}

export function getTagEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}
