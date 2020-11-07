import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../components/components.module';
import {NzListModule} from "ng-zorro-antd/list";

@NgModule({
  imports: [
    NzInputModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
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
    CommonModule,
    ComponentsModule,
    NzListModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
