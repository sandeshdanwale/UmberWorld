import { Action } from '@ngrx/store';
import { User } from '../models/aggregate/user.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD_SUCCESS: type('[User] Load Success'),
  LOAD: type('[User] Load'),
  COMMAND: type('[User] Command')
};

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: User) {

  }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: User) {

  }
}

export class CommandAction implements Action {
  type = ActionTypes.COMMAND;

  constructor(public payload: User) {

  }
}

export type Actions = LoadSuccessAction | LoadAction | CommandAction;
