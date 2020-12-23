import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {LineChartComponent} from './charts/line-chart/line-chart.component';
import {BarChartModule, LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {PieChartComponent} from './charts/pie-chart/pie-chart.component';
import {WidgetComponent} from './widgets/widget/widget.component';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CategoryComponent} from './widgets/category/category.component';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {TitleDividerComponent} from './widgets/titleDivider/title-divider.component';
import {BarChartComponent} from './charts/bar-chart/bar-chart.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {BallComponent} from './widgets/ball/ball.component';
import {AbmComponent} from './abm/abm.component';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {TranslateModule} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {BankingsTableComponent} from "../pages/consortium/bankings-table/bankings-table.component";
import {MenuComponent} from './menues/menu/menu.component';


const components = [
  LineChartComponent,
  PieChartComponent,
  WidgetComponent,
  CategoryComponent,
  BarChartComponent,
  TitleDividerComponent,
  BallComponent,
  AbmComponent,
  BankingsTableComponent,
  MenuComponent];


@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    LineChartModule,
    PieChartModule,
    NzStatisticModule,
    NzIconModule,
    NzTypographyModule,
    BarChartModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzDrawerModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSpinModule,
    TranslateModule,
    NzToolTipModule
  ],
  declarations: [...components],
  exports: [...components],
  providers: [NzModalService, NzMessageService]
})
export class ComponentsModule {
}
