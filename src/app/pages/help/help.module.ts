import {NgModule} from '@angular/core';

import {HelpRoutingModule} from './help-routing.module';
import {HelpComponent} from './help.component';
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
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {AdminHelpComponent} from './admin/admin-help.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
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
    NzButtonModule,
    NzSpinModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzInputNumberModule
  ],
  declarations: [HelpComponent, AdminHelpComponent],
  exports: [HelpComponent],
  providers: [DatePipe]
})
export class HelpModule {
}
