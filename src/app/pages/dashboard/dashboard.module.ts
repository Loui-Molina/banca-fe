import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
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
import {BankingComponent} from './banking/banking.component';
import {ConsortiumComponent} from './consortium/consortium.component';
import {AdminComponent} from './admin/admin.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {SharedBankingsTableComponent} from './shared/shared-bankings-table/shared-bankings-table.component';
import {AdminConsortiumsTableComponent} from './admin/admin-consortiums-table/admin-consortiums-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
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
        NgxGraphModule,
        NzButtonModule,
        NzTableModule,
        NzToolTipModule
    ],
  declarations: [DashboardComponent,
    BankingComponent,
    ConsortiumComponent,
    AdminComponent,
    SharedBankingsTableComponent,
    AdminConsortiumsTableComponent],
  providers: [DatePipe],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
