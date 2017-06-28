import { Action } from '@ngrx/store';
import { Tag } from '../models/aggregate/tag.model';
import { type } from '../util';

export const ActionTypes = {
  ADD_TAG: type('[Tag] Add Tag'),
  REMOVE_TAG: type('[Tag] Remove Tag'),
  REMOVE_ALL_TAG: type('[All Tag] Remove Tag')
};

export class AddTagAction implements Action {
  type = ActionTypes.ADD_TAG;

  constructor(public payload: Tag) {

  }
}

export class RemoveTagAction implements Action {
  type = ActionTypes.REMOVE_TAG;

  constructor(public payload: Tag) {

  }
}

export class RemoveAllTagsAction implements Action {
  type = ActionTypes.REMOVE_ALL_TAG;

  constructor(public payload: any) {

  }
}

export type Actions = AddTagAction | RemoveTagAction | RemoveAllTagsAction;
