import {NgModule} from '@angular/core';

import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionsComponent} from './transactions.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {CommonModule, DatePipe} from '@angular/common';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {ComponentsModule} from '../../components/components.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {TranslateModule} from "@ngx-translate/core";
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
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
    NzDrawerModule,
    NzInputModule,
    NzButtonModule
  ],
  declarations: [TransactionsComponent],
  exports: [TransactionsComponent],
  providers: [DatePipe]
})
export class TransactionsModule {
}
