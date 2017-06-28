import { Action } from '@ngrx/store';
import { Developer } from '../models/aggregate/developer.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD_SUCCESS: type('[Developer] Load Success'),
  LOAD: type('[Developer] Load'),
  UPDATE_DEVELOPER_DETAIL: type('[Developer] Update Developer Detail')
};

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Developer[]) {

  }
}

export class UpdateDeveloperDetail implements Action {
  type = ActionTypes.UPDATE_DEVELOPER_DETAIL;

  constructor(public payload: Developer) {

  }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: Developer[]) {

  }
}

export type Actions = LoadSuccessAction | LoadAction | UpdateDeveloperDetail;
