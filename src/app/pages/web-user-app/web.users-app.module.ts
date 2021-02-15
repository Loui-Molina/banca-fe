import {NgModule} from '@angular/core';

import {WebUsersAppComponent} from './web.users-app.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NzIconModule,
    ComponentsModule,
  ],
  declarations: [WebUsersAppComponent],
  exports: [CommonModule, WebUsersAppComponent, NzIconModule]
})
export class WebUsersAppModule {
}
