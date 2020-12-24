import { Component, OnInit } from '@angular/core';
import {bankings, multi} from '../../../../assets/data';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

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
      name: 'Banca 1',
      value: 2323
    },
    {
      name: 'Banca 2',
      value: 455
    },
    {
      name: 'Banca 3',
      value: 2355
    },
    {
      name: 'Banca 4',
      value: 10
    }
  ];

  private initData(): void {
    this.balance = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.balance, 0);
    this.earnings = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.earnings, 0);
    this.loses = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.prizes, 0);
    this.soldTickets = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.totalTickets, 0);
  }

  ngOnInit(): void {
  }
}
