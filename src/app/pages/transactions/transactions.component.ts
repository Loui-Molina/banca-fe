import {Component} from '@angular/core';
import {addTransaction, Transaction, transactions, TransactionType} from '../../../assets/data';

@Component({
  selector: 'app-welcome',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  constructor() {
    this.initData();
  }

  columns = [
    {title: 'Monto', key: 'amount'},
    {title: 'Ultimo balance', key: 'lastBalance'},
    {title: 'Balance actual', key: 'actualBalance'},
    {title: 'Tipo', key: 'type'}
  ];
  data: Transaction[] = transactions;

  private initData(): void {
    let b = 3000;
    for (let i = 0; i < 30; i++){
      // tslint:disable-next-line:radix
      let amount = parseInt(String(Math.random() * 100));
      let type = TransactionType.deposit;
      // tslint:disable-next-line:radix
      if ((parseInt(String(Math.random() * 100))) % 2 === 0){
        type = TransactionType.extraction;
        amount *= -1;
      }
      const trans: Transaction = {
        actualBalance: b,
        amount,
        lastBalance: b + amount,
        date: new Date(),
        type
      };
      b += amount;
      addTransaction(trans);
    }
  }
}
