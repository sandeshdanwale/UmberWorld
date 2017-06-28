import * as ui from '../actions/ui.action';
import { Observable } from 'rxjs';
import { Panel, SearchDetailPanel, PanelRankData } from '../models/aggregate/ui.model';
import { Property } from '../models/aggregate/property.model';
import * as _ from 'lodash';

export interface State {
  loaded: boolean;
  activePanels: Panel[];
  searchDetailListLoader: boolean;
  activeSearchDetailPanel: SearchDetailPanel;
  panelInFocus: Panel;
  selectedProperty: Property;
  nearByProperties: Property[];
};

const initialState: State = {
  loaded: false,
  activePanels: [],
  searchDetailListLoader: false,
  activeSearchDetailPanel: null,
  panelInFocus: null,
  selectedProperty: null,
  nearByProperties: []
};

export function reducer(state = initialState, action: ui.Actions): State {
  console.log(action.type)
  switch (action.type) {
    case ui.ActionTypes.LOAD_SUCCESS:
      return {
        loaded: true,
        activePanels: action.payload,
        searchDetailListLoader: false,
        activeSearchDetailPanel: null,
        selectedProperty: null,
        panelInFocus: null,
        nearByProperties: []
      }
    case ui.ActionTypes.OPEN_PANEL:
      return _.merge({}, state, {activePanels: _.uniqBy(_.union(state.activePanels, [action.payload]), 'name')}, {panelInFocus: action.payload})
    case ui.ActionTypes.CLOSE_PANEL:
    return {
        loaded: true,
        activePanels: _.filter(state.activePanels, (p) => p.name !== action.payload.name),
        searchDetailListLoader: false,
        activeSearchDetailPanel: state.activeSearchDetailPanel,
        selectedProperty: null,//state.selectedProperty,
        panelInFocus: _.head(_.filter(PanelRankData, (p) => p.rank === action.payload.rank - 1)),
        nearByProperties: state.nearByProperties
      }
    case ui.ActionTypes.OPEN_PROPERTY_DETAIL_OVERLAY:
    let panel: Panel = new Panel('propertyDetailOverlay');
      return {
        loaded: true,
        activePanels: _.uniqBy(_.union(state.activePanels, [panel]), 'name'),
        searchDetailListLoader: false,
        activeSearchDetailPanel: state.activeSearchDetailPanel,
        selectedProperty: action.payload,
        panelInFocus: panel,
        nearByProperties: state.nearByProperties
      }
    case ui.ActionTypes.CLOSE_PROPERTY_DETAIL_OVERLAY:
    let name: string = _.head(_.map(_.filter(PanelRankData, (f) => f.rank === _.head(_.map(_.filter(PanelRankData, (p) => p.name === 'propertyDetailOverlay'), (r) => r.rank - 1))), (n) => n.name));
      return {
        loaded: true,
        activePanels: _.filter(state.activePanels, (p) => p.name !== 'propertyDetailOverlay'),
        searchDetailListLoader: false,
        activeSearchDetailPanel: state.activeSearchDetailPanel,
        selectedProperty: null,
        panelInFocus: new Panel(name),
        nearByProperties: []
      }
    case ui.ActionTypes.UPDATE_NEAR_BY_PROPERTIES:
      return {
        loaded: true,
        activePanels: state.activePanels,
        searchDetailListLoader: false,
        activeSearchDetailPanel: state.activeSearchDetailPanel,
        selectedProperty: state.selectedProperty,
        panelInFocus: state.panelInFocus,
        nearByProperties: action.payload
      }
    case ui.ActionTypes.UPDATE_SEARCH_DETAIL:
      return {
        loaded: true,
        activePanels: state.activePanels,
        searchDetailListLoader: false,
        activeSearchDetailPanel: action.payload,
        selectedProperty: null,
        panelInFocus: state.panelInFocus,
        nearByProperties: []
      }
    case ui.ActionTypes.SHOW_SEARCH_DETAIL_LIST_LOADER:
      return {
        loaded: true,
        activePanels: state.activePanels,
        searchDetailListLoader: action.payload,
        activeSearchDetailPanel: state.activeSearchDetailPanel,
        selectedProperty: null,
        panelInFocus: state.panelInFocus,
        nearByProperties: []
      }
    default:
      return state;
  }
};

export function getActivePanels(state$: Observable<State>) {
  return state$.select(state => state.activePanels);
}

export function getActiveSearchDetailPanel(state$: Observable<State>) {
  return state$.select(state => state.activeSearchDetailPanel);
}

export function getSearchDetailListLoader(state$: Observable<State>) {
  return state$.select(state => state.searchDetailListLoader);
}

export function getSelectedProperty(state$: Observable<State>) {
  return state$.select(state => state.selectedProperty);
}

export function getNearByProperties(state$: Observable<State>) {
  return state$.select(state => state.nearByProperties);
}

export function getPanelInFocus(state$: Observable<State>) {
  return state$.select(state => state.panelInFocus);
}