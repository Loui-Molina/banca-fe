import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {IconsProviderModule} from '../icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CommonModule, DecimalPipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzButtonModule} from "ng-zorro-antd/button";


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
        NzButtonModule
    ],
  providers: [DecimalPipe],
  declarations: [LayoutComponent],
  exports: [
    CommonModule
  ]
})
export class LayoutModule {
}
