import {Component, OnInit} from '@angular/core';
import {bankings, multi} from '../../../../assets/data';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

  constructor() {
    Object.assign(this, {multi});
    this.initData();
  }

  multi: any[];

  // options
  balance: number;
  loses: number;
  earnings: number;
  soldTickets: number;

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

  private initData(): void {
    this.balance = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.balance, 0);
    this.earnings = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.earnings, 0);
    this.loses = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.prizes, 0);
    this.soldTickets = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.totalTickets, 0);
  }

  ngOnInit(): void {
  }
}
