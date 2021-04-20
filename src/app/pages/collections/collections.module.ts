import {NgModule} from '@angular/core';
import {CollectionsComponent} from './collections.component';
import {AdminCollectionsComponent} from './admin/admin-collections.component';
import {SysadminCollectionsComponent} from './sysadmin/sysadmin-collections.component';
import {TranslateModule} from '@ngx-translate/core';
import {CollectionsRoutingModule} from './collections-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CollectionsRoutingModule,
    CommonModule
  ],
  declarations: [
    CollectionsComponent,
    AdminCollectionsComponent,
    SysadminCollectionsComponent],
  exports: [
    CollectionsComponent,
    TranslateModule]
})
export class CollectionsModule {
}
