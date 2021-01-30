import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardService} from 'local-packages/banca-api';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

  ticketsSold = 0;
  profits = 0;
  awards = 0;
  balance = 0;
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
  barChartDataBalanceBankings = [];

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
  }

  dateTickFormatting = (val: string) => {
    return this.datePipe.transform(new Date(val), 'dd-MM-yy');
  };

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetBankingWidgetsStatistics().subscribe(res => {
      this.ticketsSold = res.ticketsSold;
      this.profits = res.profits;
      this.awards = res.awards;
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
    this.dashboardService.dashboardControllerGetGraphBankingBalanceStatistics().subscribe(res => {
      this.barChartDataBalanceBankings = [{
        name: 'Balance',
        series: res,
      }];
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
