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
import {ChatsComponent} from './chats.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ChatsRoutingModule} from './chats-routing.module';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzButtonModule} from 'ng-zorro-antd/button';


@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule,
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
    NzButtonModule
  ],
  declarations: [ChatsComponent],
  exports: [ChatsComponent],
  providers: [DatePipe]
})
export class ChatsModule {
}
