import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../models/aggregate/property.model';
import { User } from '../../models/aggregate/user.model';
import { Panel } from '../../models/aggregate/ui.model';
import { DisplayProperty } from '../../models/displayProperty.model';
import { AddressType, CityId, LandmarkId } from '../../models/aggregate/aggregate.model';
import { UiService } from '../../services/ui.service';
import { PropertyService } from '../../services/property.service';
import * as _ from 'lodash';

@Component({
  selector: 'property',
  templateUrl: './property.html',
  styles: ['./property.scss']
})
export class PropertyPage implements OnInit {

  @Input() property: Property;
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
      console.log(changes)
    }

    public loadPropertyDetailOverlay() {
      this.uiService.loadPropertyDetailOverlay(this.property, this.user);
    }

    get imageUrl() {
      let id = '3601'; //this.property.id.registrationId;
      return `/assets/images/property/prop${id}/propertyImage1.jpg`;
    }

    get displayProperty(): any {
      let displayProperty: DisplayProperty = new DisplayProperty();
      displayProperty.address = this.getDisplayAddress();
      displayProperty.configs = this.getDisplayConfigs();
      displayProperty.price = this.getDisplayPrice();
      displayProperty.name = this.getDisplayPropertyName();
      displayProperty.developerName = this.getDisplayDeveloperName();
      return displayProperty;
    }

    public mapToCurrencyString(price: number|string): string {
      let displayPrice = ''
      let min = _.round((Number(price)/100000), 1);
      if (min > 100) {
        min = _.round(min/100, 1);
        displayPrice += min + 'Crs'
      } else {
        displayPrice += min + 'Lakhs'
      }
      return displayPrice;
    }

    private getDisplayPrice(): string {
      let displayPrice: string = '';
      if (this.property && this.property.configs) {
        let minVal = _.minBy(this.property.configs.configs, (c) => c.basePrice);
        let maxVal = _.maxBy(this.property.configs.configs, (c) => c.basePrice);
        if (minVal) {
          displayPrice += this.mapToCurrencyString(minVal.basePrice); 
        }
        if (maxVal) {
          if (minVal) {
            displayPrice += ' - '
          }
          displayPrice += this.mapToCurrencyString(maxVal.basePrice);
        }
      }
      return displayPrice;
    }

    private getDisplayPropertyName(): string{
      return this.property ? this.property.name : '';
    }

    private getDisplayDeveloperName(): string{
      return this.property ? this.property.developerName : '';
    }

    private getDisplayConfigs(): string {
      let is1BHK: boolean = false;
      let is2BHK: boolean = false;
      let is3BHK: boolean = false;
      let isRowhouse: boolean = false;
      let displayConfig: string = '';
      if (this.property && this.property.configs) {
        _.forEach(this.property.configs.configs, (c) => {
          if (c.type === '1bhk') is1BHK = true;
          if (c.type === '2bhk') is2BHK = true;
          if (c.type === '3bhk') is3BHK = true;
          if (c.type === 'rowhouse') isRowhouse = true;
        })
      }
      if (is1BHK) displayConfig += '1';
      if (is2BHK) displayConfig += !is1BHK ? '2' : ', 2';
      if (is3BHK) displayConfig += !is1BHK && !is2BHK ? '3' : ', 3';
      if (is1BHK || is2BHK || is3BHK) displayConfig += ' BHK Apartments'
      if (isRowhouse) displayConfig += !is1BHK && !is2BHK && !is3BHK ? 'RowHouses' : ', RowHouses';
      return displayConfig;
    }



    private getDisplayAddress(): string {
      let address = _.head(_.filter(this.property.addresses, (p) => p.type.toString() === 'HOME'));
      if (address) {
        let lines = '';
        lines = !address.line1 ? lines : lines ? lines + ', ' + address.line1 : address.line1;
        lines = !address.line2 ? lines : lines ? lines + ', ' + address.line2 : address.line2;
        lines = !address.line3 ? lines : lines ? lines + ', ' + address.line3 : address.line3;

        let txt = lines + ', ' + this.property.cityName + ', ' + address.state;
        return txt.length > 35 ? txt.slice(0, 35) + ' ...' : txt;
      }
      return '';
    }

}
