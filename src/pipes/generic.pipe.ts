import { Pipe } from '@angular/core';
import { Property } from '../models/aggregate/property.model';
import { Developer } from '../models/aggregate/developer.model';
import { Config } from '../models/aggregate/config.model';
import { SearchDetailPanel } from '../models/aggregate/ui.model';
import { Landmark } from '../models/aggregate/landmark.model';
import * as _ from 'lodash';

@Pipe({
  name: "orderBy"
})
export class OrderByPipe {
  transform(array: Array<Property>, args: string): Array<Property> {
    if (!array) return array;
    return _.sortBy(array, (p) =>  p && p.name);
  }
}

@Pipe({
  name: "activeLandmarkPipe"
})
export class ActiveLandmarkPipe {
  transform(landmarks: Array<Landmark>, activeSearchDetailPanel: SearchDetailPanel): Landmark {
    if (!landmarks) return;
    if (!activeSearchDetailPanel || activeSearchDetailPanel.name !== 'landmark') return;
    return _.head(_.filter(landmarks, (l) => l.id.registrationId === activeSearchDetailPanel.entityId));
  }
}

@Pipe({
  name: "activeDeveloperPipe"
})
export class ActiveDeveloperPipe {
  transform(developers: Array<Developer>, activeSearchDetailPanel: SearchDetailPanel): Developer {
    if (!developers) return;
    if (!activeSearchDetailPanel || activeSearchDetailPanel.name !== 'developer') return;
    return _.head(_.filter(developers, (d) => d.id.registrationId === activeSearchDetailPanel.entityId));
  }
}

@Pipe({
  name: "activePropertyPipe"
})
export class ActivePropertyPipe {
  transform(properties: Array<Property>, activeSearchDetailPanel: SearchDetailPanel): Property {
    if (!properties) return;
    if (!activeSearchDetailPanel || activeSearchDetailPanel.name !== 'property') return;
    return _.head(_.filter(properties, (p) => p.id.registrationId === activeSearchDetailPanel.entityId));
  }
}

@Pipe({
  name: "displayViewport"
})
export class DisplayViewport {
  transform(properties: Array<Property>, viewPort: number): Property[] {
    return _.slice(properties, 0, viewPort);
  }
}

@Pipe({
  name: "displayConfig"
})
export class DisplayConfig {
  transform(config: Config): any {
    return config;
  }
}