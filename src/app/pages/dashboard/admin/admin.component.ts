import { Component, OnInit } from '@angular/core';
import {consortiums, multi} from '../../../../assets/data';
import {MiniMapPosition} from '@swimlane/ngx-graph';
import {DashboardService} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  multi: any[];
  miniMapPosition = MiniMapPosition;
  // options
  balance: number;
  loses: number;
  earnings: number;
  soldTickets: number;

  constructor(private dashboardService: DashboardService) {
    Object.assign(this, {multi});
    this.initData();
  }
  clusters = [];
  nodes = [];
  links = [];
  single = [
    {
      name: 'Ganancias',
      value: 541
    },
    {
      name: 'Perdidas',
      value: 233
    }
  ];

  barChartData = [
    {
      name: 'Consorcio 1',
      value: 2323
    },
    {
      name: 'Consorcio 2',
      value: 455
    },
    {
      name: 'Consorcio 3',
      value: 2355
    },
    {
      name: 'Consorcio 4',
      value: 10
    }
  ];

  private initData(): void {
    this.balance = consortiums.reduce((previousValue, currentValue) => previousValue + currentValue.balance, 0);
    this.earnings = consortiums.reduce((previousValue, currentValue) => previousValue + currentValue.earnings, 0);
    this.loses = consortiums.reduce((previousValue, currentValue) => previousValue + currentValue.prizes, 0);
    this.soldTickets = consortiums.reduce((previousValue, currentValue) => previousValue + currentValue.totalTickets, 0);
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetDashboardDiagram().subscribe(res => {
      this.clusters = res.clusters;
      this.links = res.links;
      this.nodes = res.nodes;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
