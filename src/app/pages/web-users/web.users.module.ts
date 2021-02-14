import {NgModule} from '@angular/core';
import {WebUsersComponent} from './web.users.component';
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
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {WebUsersRoutingModule} from './web.users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WebUsersRoutingModule,
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
    NzDescriptionsModule
  ],
  declarations: [WebUsersComponent],
  exports: [WebUsersComponent],
  providers: [DatePipe]
})
export class WebUsersModule {
}
