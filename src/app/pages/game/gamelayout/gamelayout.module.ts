import { NgModule } from '@angular/core';

import { GameLayoutComponent } from './gamelayout.component';
import {BrowserModule} from '@angular/platform-browser';
import {IconsProviderModule} from '../../../icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {NzTypographyModule} from "ng-zorro-antd/typography";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule,
    NzDropDownModule,
    NzBadgeModule,
    NzTypographyModule
  ],
  declarations: [GameLayoutComponent],
  exports: [
    CommonModule
  ]
})
export class GameLayoutModule { }
