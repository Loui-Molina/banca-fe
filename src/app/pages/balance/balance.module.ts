import {NgModule} from '@angular/core';

import {BalanceRoutingModule} from './balance-routing.module';
import {BalanceComponent} from './balance.component';
import {CommonModule, DatePipe} from '@angular/common';
import {AdminBalanceComponent} from './admin/admin-balance.component';
import {ConsortiumBalanceComponent} from './consortium/consortium-balance.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: [
    CommonModule,
    BalanceRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzToolTipModule,
    NzTimePickerModule,
    NzDrawerModule,
    FormsModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzDescriptionsModule,
    NzTagModule,
    NzDatePickerModule
  ],
  providers: [FormBuilder, DatePipe],
  declarations: [BalanceComponent, AdminBalanceComponent, ConsortiumBalanceComponent],
  exports: [BalanceComponent, TranslateModule]
})
export class BalanceModule {
}
