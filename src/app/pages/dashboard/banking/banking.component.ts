import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardService, PlayedNumbersDto} from 'local-packages/banca-api';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

  ticketsSold = 0;
  profits = 0;
  prizes = 0;
  balance = 0;
  pieChartData = [];
  hideDashboard = true;
  barChartDataBalanceBankings = [];
  numbersPlayed: PlayedNumbersDto[] = [];

  constructor(private dashboardService: DashboardService, private translateService: TranslateService, private datePipe: DatePipe) {
  }

  dateTickFormatting = (val: string) => {
    return this.datePipe.transform(new Date(val), 'dd-MM-yy');
  }

  formatResult(value: number): string {
    return String(value).padStart(2, '0');
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetBankingWidgetsStatistics().subscribe(res => {
      this.ticketsSold = res.ticketsSold;
      this.profits = res.profits;
      this.prizes = res.prizes;
      this.balance = res.balance;
      this.pieChartData = [
        {
          name: this.ts('DASHBOARD.PRIZES_VS_PROFITS.PROFITS'),
          value: res.profits
        },
        {
          name: this.ts('DASHBOARD.PRIZES_VS_PROFITS.PRIZES'),
          value: res.prizes
        }
      ];
      if (res.profits || res.prizes){
        this.hideDashboard = false;
      } else {
        this.hideDashboard = true;
      }
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
    this.dashboardService.dashboardControllerGetBankingPlayedNumbersStatistics().subscribe(res => {
      this.numbersPlayed = res.numbers;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
