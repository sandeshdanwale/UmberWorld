import { IUi } from './aggregate.model';
import * as _ from 'lodash';

export class Panel {
	name: string;
	rank: number;
	constructor (
		name: string
	) {
		this.name = name;
		this.rank = _.head(_.map(_.filter(PanelRankData, (p) => p.name === name), (r) => r.rank));
	}
}

export class SearchDetailPanel {
	name: string;
	entityId: string;
	constructor (
		name: string,
		entityId: string
	) {
		this.name = name;
		this.entityId = entityId;
	}
}

export const PanelRankData = [
	{
		name: 'main',
		rank: 1
	}, {
		name: 'searchOverlay',
		rank: 2
	}, {
		name: 'searchDetailList',
		rank: 3
	}, {
		name: 'propertyDetailOverlay',
		rank: 4
	}, {
		name: 'imageOverlay',
		rank: 5
	}
]

/*
export class Ui implements IUi{
	panels: Array<Panel>;
  
	constructor(data: any) {
	    this.panels = data.panels;
    }

}
*/