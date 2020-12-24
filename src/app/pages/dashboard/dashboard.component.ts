import {Component} from '@angular/core';
import {
  bankings,
  multi
} from '../../../assets/data';

@Component({
  selector: 'app-welcome',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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

  barChartData = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'Argentina',
      value: 3212121
    },
    {
      name: 'Bolivia',
      value: 123233
    },
    {
      name: 'Paraguay',
      value: 2343434
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ];


  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  private initData() {
    this.balance = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.balance, 0);
    this.earnings = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.earnings, 0);
    this.loses = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.prizes, 0);
    this.soldTickets = bankings.reduce((previousValue, currentValue) => previousValue + currentValue.totalTickets, 0);
  }
}
