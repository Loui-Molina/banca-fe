import {NgModule} from '@angular/core';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {CommonModule, DatePipe} from '@angular/common';
import {ComponentsModule} from '../../components/components.module';
import {BettingPanelComponent} from './bettingPanel.component';
import {BettingPanelRoutingModule} from './bettingPanel-routing.module';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import {CountdownModule} from 'ngx-countdown';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {TranslateModule} from '@ngx-translate/core';
import { DrawerBetsComponent } from './drawer-bets/drawer-bets.component';
import {DrawerBetComponent} from './drawer-bet/drawer-bet.component';
import { DrawerHelpComponent } from './drawer-help/drawer-help.component';
import { DrawerLotteriesComponent } from './drawer-lotteries/drawer-lotteries.component';
import { DrawerPayBetComponent } from './drawer-pay-bet/drawer-pay-bet.component';
import { DrawerResumeSellsComponent } from './drawer-resume-sells/drawer-resume-sells.component';
import {DrawerChatComponent} from './drawer-chat/drawer-chat.component';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {DrawerLastPlaysComponent} from './drawer-last-plays/drawer-last-plays.component';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    BettingPanelRoutingModule,
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
    NzSwitchModule,
    ComponentsModule,
    NzSelectModule,
    NzDrawerModule,
    NzDropDownModule,
    NzToolTipModule,
    NzDividerModule,
    NzTagModule,
    CountdownModule,
    NzListModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberModule,
    TranslateModule,
    NzBadgeModule
  ],
  providers: [DatePipe],
  declarations: [
    BettingPanelComponent,
    DrawerBetsComponent,
    DrawerBetComponent,
    DrawerHelpComponent,
    DrawerLotteriesComponent,
    DrawerPayBetComponent,
    DrawerResumeSellsComponent,
    DrawerLastPlaysComponent,
    DrawerChatComponent
  ],
  exports: [BettingPanelComponent]
})
export class BettingPanelModule {
}
