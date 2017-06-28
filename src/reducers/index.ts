import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';
import * as fromCity from './city.reducer';
import * as fromLandmark from './landmark.reducer';
import * as fromDeveloper from './developer.reducer';
import * as fromProperty from './property.reducer';
import * as fromDefaultProperty from './defaultProperty.reducer';
import * as fromGlobalProperty from './globalProperty.reducer';
import * as fromGlobalDeveloper from './globalDeveloper.reducer';
import * as fromUi from './ui.reducer';
import * as fromUser from './user.reducer';
import * as fromTag from './tag.reducer';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { City } from '../models/aggregate/city.model';
import { Developer } from '../models/aggregate/developer.model';
import { Tag } from '../models/aggregate/tag.model';
import { Property } from '../models/aggregate/property.model';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
  city: fromCity.State,
  landmark: fromLandmark.State,
  developer: fromDeveloper.State,
  property: fromProperty.State,
  defaultProperty: fromDefaultProperty.State,
  globalProperty: fromGlobalProperty.State,
  globalDeveloper: fromGlobalDeveloper.State,
  tag: fromTag.State,
  ui: fromUi.State,
  user: fromUser.State
};

const reducers = {
  city: fromCity.reducer,
  landmark: fromLandmark.reducer,
  developer: fromDeveloper.reducer,
  property: fromProperty.reducer,
  defaultProperty: fromDefaultProperty.reducer,
  globalProperty: fromGlobalProperty.reducer,
  globalDeveloper: fromGlobalDeveloper.reducer,
  tag: fromTag.reducer,
  ui: fromUi.reducer,
  user: fromUser.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export function getDeveloperState(state$: Observable<State>) {
  return state$.select(state => state.developer);
}

export function getCityState(state$: Observable<State>) {
  return state$.select(state => state.city);
}

export function getLandmarkState(state$: Observable<State>) {
  return state$.select(state => state.landmark);
}

export function getPropertyState(state$: Observable<State>) {
  return state$.select(state => state.property);
}

export function getDefaultPropertyState(state$: Observable<State>) {
  return state$.select(state => state.defaultProperty);
}

export function getGlobalPropertyState(state$: Observable<State>) {
  return state$.select(state => state.globalProperty);
}

export function getGlobalDeveloperState(state$: Observable<State>) {
  return state$.select(state => state.globalDeveloper);
}

export function getTagState(state$: Observable<State>) {
  return state$.select(state => state.tag);
}

export function getUiState(state$: Observable<State>) {
  return state$.select(state => state.ui);
}

export function getUserState(state$: Observable<State>) {
  return state$.select(state => state.user);
}

export const getDeveloperEntities = compose(fromDeveloper.getDeveloperEntities, getDeveloperState);
export const getPropertyEntities = compose(fromProperty.getPropertyEntities, getPropertyState);
export const getDefaultPropertyEntities = compose(fromDefaultProperty.getDefaultPropertyEntities, getDefaultPropertyState);
export const getGlobalPropertyEntities = compose(fromGlobalProperty.getGlobalPropertyEntities, getGlobalPropertyState);
export const getGlobalDeveloperEntities = compose(fromGlobalDeveloper.getGlobalDeveloperEntities, getGlobalDeveloperState);
export const getCityEntities = compose(fromCity.getCityEntities, getCityState);
export const getLandmarkEntities = compose(fromLandmark.getLandmarkEntities, getLandmarkState);
export const getUserEntities = compose(fromUser.getUserEntities, getUserState);
export const getActivePanels = compose(fromUi.getActivePanels, getUiState);
export const getTagEntities = compose(fromTag.getTagEntities, getTagState);
export const getActiveSearchDetailPanel = compose(fromUi.getActiveSearchDetailPanel, getUiState);
export const getSearchDetailListLoader = compose(fromUi.getSearchDetailListLoader, getUiState);
export const getSelectedProperty = compose(fromUi.getSelectedProperty, getUiState);
export const getNearByProperties = compose(fromUi.getNearByProperties, getUiState);
export const getPanelInFocus = compose(fromUi.getPanelInFocus, getUiState);
