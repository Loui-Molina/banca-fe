import {NgModule} from '@angular/core';

import {AccountingPanelRoutingModule} from './accountingPanel-routing.module';
import {AccountingPanelComponent} from './accountingPanel.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {CommonModule, DatePipe} from '@angular/common';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {ComponentsModule} from '../../components/components.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {TranslateModule} from '@ngx-translate/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    AccountingPanelRoutingModule,
    NzListModule,
    NzTypographyModule,
    LineChartModule,
    PieChartModule,
    NzGridModule,
    ComponentsModule,
    NzIconModule,
    NzCalendarModule,
    NzDividerModule,
    TranslateModule,
    NzTableModule,
    NzToolTipModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzDescriptionsModule,
    NzDatePickerModule,
    FormsModule,
    NzPageHeaderModule,
    NzButtonModule
  ],
  declarations: [AccountingPanelComponent],
  exports: [AccountingPanelComponent],
  providers: [DatePipe]
})
export class AccountingPanelModule {
}
