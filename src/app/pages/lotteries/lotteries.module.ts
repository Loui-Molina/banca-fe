import {NgModule} from '@angular/core';

import {LotteriesRoutingModule} from './lotteries-routing.module';
import {LotteriesComponent} from './lotteries.component';
import {CommonModule, DatePipe} from '@angular/common';
import {AdminLotteriesComponent} from './admin/admin-lotteries.component';
import {ConsortiumLotteriesComponent} from './consortium/consortium-lotteries.component';
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

@NgModule({
  imports: [
    CommonModule,
    LotteriesRoutingModule,
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
    NzTableModule
  ],
  providers: [FormBuilder, DatePipe],
  declarations: [LotteriesComponent, AdminLotteriesComponent, ConsortiumLotteriesComponent],
  exports: [LotteriesComponent, TranslateModule]
})
export class LotteriesModule {
}
