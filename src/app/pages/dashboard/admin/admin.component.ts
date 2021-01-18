import { Component, OnInit } from '@angular/core';
import {MiniMapPosition} from '@swimlane/ngx-graph';
import {
  DashboardDiagramClusterDto, DashboardDiagramLinkDto, DashboardDiagramNodeDto, DashboardGraphBankingDto,
  DashboardGraphConsortiumDto,
  DashboardService
} from 'local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  miniMapPosition = MiniMapPosition;
  ticketsSold = 0;
  profits = 0;
  losses = 0;
  balance = 0;

  constructor(private dashboardService: DashboardService) {
  }
  clusters: DashboardDiagramClusterDto[] = [];
  nodes: DashboardDiagramNodeDto[] = [];
  links: DashboardDiagramLinkDto[] = [];
  barChartDataConsortiums: DashboardGraphConsortiumDto[] = [];
  barChartDataBankings: DashboardGraphBankingDto[] = [];

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetDashboardDiagram().subscribe(res => {
      this.clusters = res.clusters;
      this.links = res.links;
      this.nodes = res.nodes;
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
      this.losses = res.losses;
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
