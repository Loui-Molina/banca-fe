import {NgModule} from '@angular/core';

import {WebUsersAppComponent} from './web.users-app.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NzIconModule,
  ],
  declarations: [WebUsersAppComponent],
  exports: [CommonModule, WebUsersAppComponent, NzIconModule]
})
export class WebUsersAppModule {
}
