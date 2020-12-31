import {NgModule} from '@angular/core';

import {LotteriesRoutingModule} from './lotteries-routing.module';
import {LotteriesComponent} from './lotteries.component';
import {CommonModule, DatePipe} from '@angular/common';
import {AdminLotteriesComponent} from "./admin/admin-lotteries.component";
import {ConsortiumLotteriesComponent} from "./consortium/consortium-lotteries.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";

@NgModule({
  imports: [
    CommonModule,
    LotteriesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzToolTipModule,
    NzTimePickerModule
  ],
  providers: [FormBuilder, DatePipe],
  declarations: [LotteriesComponent, AdminLotteriesComponent, ConsortiumLotteriesComponent],
  exports: [LotteriesComponent, TranslateModule]
})
export class LotteriesModule {
}
