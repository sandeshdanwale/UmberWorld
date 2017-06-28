import { Action } from '@ngrx/store';
import { Panel, SearchDetailPanel } from '../models/aggregate/ui.model';
import { Property } from '../models/aggregate/property.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD_SUCCESS: type('[Ui] Load Success'),
  LOAD: type('[Ui] Load'),
  OPEN_PANEL: type('[UI] Open Panel'),
  CLOSE_PANEL: type('[UI] Close Panel'),
  UPDATE_NEAR_BY_PROPERTIES: type('[UI] Update Near By Properties'),
  OPEN_PROPERTY_DETAIL_OVERLAY: type('[UI] Open Property Detail'),
  CLOSE_PROPERTY_DETAIL_OVERLAY: type('[UI] Close Property Detail'),
  UPDATE_SEARCH_DETAIL: type('[UI] Update Search Detail'),
  SHOW_SEARCH_DETAIL_LIST_LOADER: type('[UI] Show Search Detail List Loader')
};

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Array<Panel>) {

  }
}

export class UpdateSearchDetail implements Action {
  type = ActionTypes.UPDATE_SEARCH_DETAIL;

  constructor(public payload: SearchDetailPanel) {

  }
}

export class ShowSearchDetailListLoader implements Action {
  type = ActionTypes.SHOW_SEARCH_DETAIL_LIST_LOADER;

  constructor(public payload: boolean) {

  }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: Array<Panel>) {

  }
}

export class OpenPropertyDetailOverlayAction implements Action {
  type = ActionTypes.OPEN_PROPERTY_DETAIL_OVERLAY;

  constructor(public payload: Property) {

  }
}

export class UpdateNearByPropertiesAction implements Action {
  type = ActionTypes.UPDATE_NEAR_BY_PROPERTIES;

  constructor(public payload: Property[]) {

  }
}

export class ClosePropertyDetailOverlayAction implements Action {
  type = ActionTypes.CLOSE_PROPERTY_DETAIL_OVERLAY;

  constructor(public payload: any) {

  }
}

export class OpenPanelAction implements Action {
  type = ActionTypes.OPEN_PANEL;

  constructor(public payload: Panel) {

  }
}

export class ClosePanelAction implements Action {
  type = ActionTypes.CLOSE_PANEL;

  constructor(public payload: Panel) {

  }
}

export type Actions = LoadSuccessAction | LoadAction | OpenPanelAction | ClosePanelAction | 
UpdateSearchDetail | ShowSearchDetailListLoader | OpenPropertyDetailOverlayAction | 
ClosePropertyDetailOverlayAction | UpdateNearByPropertiesAction;
