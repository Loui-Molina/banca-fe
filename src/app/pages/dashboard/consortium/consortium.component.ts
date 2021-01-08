import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardGraphBankingDto, DashboardService} from '../../../../../local-packages/banca-api';

@Component({
  selector: 'app-dashboard-consortium',
  templateUrl: './consortium.component.html',
  styleUrls: ['./consortium.component.scss']
})
export class ConsortiumComponent implements OnInit {

  // options
  balance: number;
  loses: number;
  earnings: number;
  soldTickets: number;

  constructor(private dashboardService: DashboardService) {
    this.initData();
  }
  barChartDataBankings: DashboardGraphBankingDto[] = [];
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

  private initData(): void {
    this.balance = 100;
    this.earnings = 100;
    this.loses = 100;
    this.soldTickets = 100;
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetGraphBankingStatistics().subscribe(res => {
      this.barChartDataBankings = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
