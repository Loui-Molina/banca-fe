import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardGraphBankingDto, DashboardService} from 'local-packages/banca-api';

@Component({
  selector: 'app-dashboard-consortium',
  templateUrl: './consortium.component.html',
  styleUrls: ['./consortium.component.scss']
})
export class ConsortiumComponent implements OnInit {


  ticketsSold = 0;
  profits = 0;
  awards = 0;
  balance = 0;
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

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetGraphBankingStatistics().subscribe(res => {
      this.barChartDataBankings = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetConsortiumWidgetsStatistics().subscribe(res => {
      this.ticketsSold = res.ticketsSold;
      this.profits = res.profits;
      this.awards = res.awards;
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
