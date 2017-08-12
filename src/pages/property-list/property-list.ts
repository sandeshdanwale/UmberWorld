import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Property } from '../../models/aggregate/property.model';
import { User } from '../../models/aggregate/user.model';
import { Panel } from '../../models/aggregate/ui.model';
import { DisplayProperty } from '../../models/displayProperty.model';
import { AddressType, CityId, LandmarkId } from '../../models/aggregate/aggregate.model';
import { UiService } from '../../services/ui.service';
import { PropertyService } from '../../services/property.service';
import * as _ from 'lodash';

@Component({
  selector: 'property-list',
  templateUrl: './property-list.html',
  styles: ['./property-list.scss']
})
export class PropertyListPage implements OnInit, OnChanges {

  @Input() properties: Property[];
  @Input() user: User;
  private style: any;

  constructor(
      private uiService: UiService,
      private propertyService: PropertyService
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
    }


}
