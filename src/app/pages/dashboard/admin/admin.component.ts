import { Component, OnInit } from '@angular/core';
import {MiniMapPosition} from '@swimlane/ngx-graph';
import {
  DashboardDiagramClusterDto, DashboardDiagramLinkDto, DashboardDiagramNodeDto,
  DashboardGraphConsortiumDto,
  DashboardService
} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  miniMapPosition = MiniMapPosition;
  // options
  balance: number;
  loses: number;
  earnings: number;
  soldTickets: number;

  constructor(private dashboardService: DashboardService) {
    this.initData();
  }
  clusters: DashboardDiagramClusterDto[] = [];
  nodes: DashboardDiagramNodeDto[] = [];
  links: DashboardDiagramLinkDto[] = [];
  barChartData: DashboardGraphConsortiumDto[] = [];

  private initData(): void {
    this.balance = 100;
    this.earnings = 100;
    this.loses = 100;
    this.soldTickets = 100;
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetDashboardDiagram().subscribe(res => {
      this.clusters = res.clusters;
      this.links = res.links;
      this.nodes = res.nodes;
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetGraphConsortiumStatistics().subscribe(res => {
      this.barChartData = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
