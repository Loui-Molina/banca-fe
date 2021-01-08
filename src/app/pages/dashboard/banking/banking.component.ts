import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardService} from '../../../../../local-packages/banca-api';

@Component({
  selector: 'app-dashboard-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {
  }

  ticketsSold = 0;
  profits = 0;
  losses = 0;
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
  lineChartData = [
    {
      name: 'Balance',
      series: [
        {
          value: 3423,
          name: '2016-09-22T03:02:10.066Z'
        },
        {
          value: 5791,
          name: '2016-09-18T16:18:36.101Z'
        },
        {
          value: 3115,
          name: '2016-09-22T06:26:23.563Z'
        },
        {
          value: 4393,
          name: '2016-09-18T08:16:17.334Z'
        },
        {
          value: 4432,
          name: '2016-09-19T10:02:33.465Z'
        }
      ]
    }
  ];

  dateTickFormatting(val: string): string {
    return new Date(val).toDateString();
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetBankingWidgetsStatistics().subscribe(res => {
      this.ticketsSold = res.ticketsSold;
      this.profits = res.profits;
      this.losses = res.losses;
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
