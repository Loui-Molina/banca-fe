import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {CommonModule} from '@angular/common';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {ComponentsModule} from '../../components/components.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {TranslateModule} from "@ngx-translate/core";
import { BankingComponent } from './banking/banking.component';
import { ConsortiumComponent } from './consortium/consortium.component';
import { AdminComponent } from './admin/admin.component';

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
    TranslateModule
  ],
  declarations: [DashboardComponent, BankingComponent, ConsortiumComponent, AdminComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {
}
