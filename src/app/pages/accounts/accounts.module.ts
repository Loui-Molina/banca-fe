import {NgModule} from '@angular/core';
import {AccountsRoutingModule} from './accounts-routing.module';

import {AccountsComponent} from './accounts.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {CommonModule} from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';

@NgModule({
    imports: [
        CommonModule,
        AccountsRoutingModule,
        NzDescriptionsModule,
        NzTableModule,
        NzPageHeaderModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        ComponentsModule,
        ReactiveFormsModule,
        NzInputModule
    ],
  declarations: [AccountsComponent],
  exports: [AccountsComponent]
})
export class AccountsModule {
}
