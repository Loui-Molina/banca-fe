import { Component, OnInit } from '@angular/core';
import {consortiums, multi} from '../../../../assets/data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  multi: any[];

  // options
  balance: number;
  loses: number;
  earnings: number;
  soldTickets: number;

  constructor() {
    Object.assign(this, {multi});
    this.initData();
  }

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
  }
}
