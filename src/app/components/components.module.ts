import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {LineChartComponent} from './charts/line-chart/line-chart.component';
import {BarChartModule, LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {PieChartComponent} from './charts/pie-chart/pie-chart.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { CategoryComponent } from './widgets/category/category.component';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import { TitleDividerComponent } from './widgets/title-divider/title-divider.component';
import {BarChartComponent} from './charts/bar-chart/bar-chart.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { BallComponent } from './widgets/ball/ball.component';


const components = [
  LineChartComponent,
  PieChartComponent,
  WidgetComponent,
  CategoryComponent,
  BarChartComponent,
  TitleDividerComponent,
  BallComponent
];


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
    NzDividerModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class ComponentsModule {
}
