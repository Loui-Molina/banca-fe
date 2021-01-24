import {NgModule} from '@angular/core';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../components/components.module';
import {SlotMachineComponent} from './slotMachine.component';
import {SlotMachineRoutingModule} from './slotMachine-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    SlotMachineRoutingModule,
    FormsModule,
    NzGridModule,
    NzFormModule,
    NzCheckboxModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzTypographyModule,
    NzSwitchModule,
    ComponentsModule
  ],
  declarations: [SlotMachineComponent],
  exports: [SlotMachineComponent]
})
export class SlotMachineModule {
}
