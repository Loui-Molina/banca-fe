import {NgModule} from '@angular/core';
import {UsersRoutingModule} from './users-routing.module';

import {UsersComponent} from './users.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {CommonModule} from '@angular/common';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {TranslateModule} from '@ngx-translate/core';
import {NzSelectModule} from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzDescriptionsModule,
    NzTableModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    ComponentsModule,
    ReactiveFormsModule,
    NzInputModule,
    TranslateModule,
    NzSelectModule
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule {
}
