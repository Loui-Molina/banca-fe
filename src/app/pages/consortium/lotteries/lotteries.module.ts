import {NgModule} from '@angular/core';

import {LotteriesRoutingModule} from './lotteries-routing.module';
import {LotteriesComponent} from './lotteries.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {CommonModule, DatePipe} from '@angular/common';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {ComponentsModule} from '../../../components/components.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {TranslateModule} from "@ngx-translate/core";
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSwitchModule} from "ng-zorro-antd/switch";

@NgModule({
    imports: [
        CommonModule,
        LotteriesRoutingModule,
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
        NzSelectModule,
        NzInputModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzSwitchModule
    ],
  declarations: [LotteriesComponent],
  exports: [LotteriesComponent],
  providers: [DatePipe]
})
export class LotteriesModule {
}
