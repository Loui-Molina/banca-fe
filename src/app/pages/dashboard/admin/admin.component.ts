import {Component, OnInit} from '@angular/core';
import {MiniMapPosition} from '@swimlane/ngx-graph';
import {
  DashboardDiagramClusterDto,
  DashboardDiagramLinkDto,
  DashboardDiagramNodeDto,
  DashboardGraphBankingDto,
  DashboardGraphConsortiumDto,
  DashboardService
} from 'local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  miniMapPosition = MiniMapPosition;
  ticketsSold = 0;
  hideDashboard = false;
  profits = 0;
  prizes = 0;
  balance = 0;
  clusters: DashboardDiagramClusterDto[] = [];
  nodes: DashboardDiagramNodeDto[] = [];
  links: DashboardDiagramLinkDto[] = [];
  barChartDataConsortiums: DashboardGraphConsortiumDto[] = [];
  barChartDataBankings: DashboardGraphBankingDto[] = [];

  constructor(private dashboardService: DashboardService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetDashboardDiagram().subscribe(res => {
      this.clusters = res.clusters.map(item => {
        return {...item, label: this.ts(item.label)};
      });
      this.links = res.links;
      this.nodes = res.nodes;
      if (this.links.length > 0 || this.nodes.length > 0) {
        this.hideDashboard = false;
      } else {
        this.hideDashboard = true;
      }
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetGraphConsortiumStatistics().subscribe(res => {
      this.barChartDataConsortiums = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetGraphBankingStatistics().subscribe(res => {
      this.barChartDataBankings = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetAdminWidgetsStatistics().subscribe(res => {
      this.ticketsSold = res.ticketsSold;
      this.profits = res.profits;
      this.prizes = res.prizes;
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
