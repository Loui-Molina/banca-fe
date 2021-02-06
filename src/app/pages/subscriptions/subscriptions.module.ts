import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionsComponent} from './subscriptions.component';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {SubscriptionRoutingModule} from './subscription-routing.module';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzGridModule} from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [SubscriptionsComponent],
  exports: [SubscriptionsComponent],
  imports: [SubscriptionRoutingModule,
    CommonModule,
    ComponentsModule,
    TranslateModule,
    NzTableModule,
    NzButtonModule, NzDividerModule, NzInputNumberModule, FormsModule, NzSelectModule, NzDrawerModule, NzInputModule, NzGridModule, ReactiveFormsModule
  ]
})
export class SubscriptionsModule {
}
