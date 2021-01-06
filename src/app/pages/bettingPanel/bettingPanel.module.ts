import { NgModule } from '@angular/core';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../components/components.module';
import {BettingPanelComponent} from './bettingPanel.component';
import {BettingPanelRoutingModule} from './bettingPanel-routing.module';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    BettingPanelRoutingModule,
    FormsModule,
    NzGridModule,
    NzFormModule,
    NzCheckboxModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzTypographyModule,
    NzSwitchModule,
    ComponentsModule,
    NzDrawerModule,
    NzSelectModule,
    NzDropDownModule,
    NzToolTipModule,
    NzDividerModule,
    NzTagModule,
    CountdownModule,
    NzListModule
  ],
  declarations: [BettingPanelComponent],
  exports: [BettingPanelComponent]
})
export class BettingPanelModule { }
