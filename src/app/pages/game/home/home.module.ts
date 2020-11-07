import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
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

@NgModule({
  imports: [
    NzInputModule,
    HomeRoutingModule,
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
    ComponentsModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
