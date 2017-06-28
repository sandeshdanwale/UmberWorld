import { Action } from '@ngrx/store';
import { City } from '../models/aggregate/city.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD_SUCCESS: type('[City] Load Success'),
  LOAD: type('[City] Load'),
};

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: City[]) {

  }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: City[]) {

  }
}

export type Actions = LoadSuccessAction | LoadAction;
