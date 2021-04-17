import {NgModule} from '@angular/core';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzTableModule} from 'ng-zorro-antd/table';
import {ComponentsModule} from '../../components/components.module';
import {CommonModule, DatePipe} from '@angular/common';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {TranslateModule} from '@ngx-translate/core';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ConsortiumTicketsWebComponent} from './consortium/consortium-tickets-web.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {TicketsWebRoutingModule} from './tickets-web-routing.module';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {TicketsWebComponent} from './tickets-web.component';
import {AdminTicketsWebComponent} from './admin/admin-tickets-web.component';
import {BankingTicketsWebComponent} from './banking/banking-tickets-web.component';


@NgModule({
  imports: [
    CommonModule,
    TicketsWebRoutingModule,
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
    NzDatePickerModule,
    NzInputNumberModule,
    NzButtonModule,
    FormsModule,
    NzTagModule
  ],
  declarations: [TicketsWebComponent, BankingTicketsWebComponent, ConsortiumTicketsWebComponent, AdminTicketsWebComponent],
  exports: [ConsortiumTicketsWebComponent],
  providers: [DatePipe]
})
export class TicketsWebModule {
}
