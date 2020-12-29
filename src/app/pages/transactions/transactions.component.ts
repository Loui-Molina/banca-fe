import {Component} from '@angular/core';
import {addTransaction, Transaction, transactions, TransactionType} from '../../../assets/data';
import {DatePipe} from '@angular/common';
import {User} from '../../../../local-packages/banca-api';
import {UserInterface, UserService} from '../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  constructor(private datePipe: DatePipe, private userService: UserService) {
    this.initData();
  }
  drawerTransaction = false;
  user: UserInterface;
  userRole = User.RoleEnum;
  columns = [
    {title: 'Fecha', key: 'date', valueFormatter: (item, column) => this.valueFormatterDate(item, column)},
    {title: 'Monto', key: 'amount', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Ultimo balance', key: 'lastBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Balance actual', key: 'actualBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Tipo', key: 'type', valueFormatter: (item, column) => this.valueFormatterTipo(item, column)}
  ];
  data: Transaction[] = transactions;

  valueFormatter(data: Transaction, column): any{
    return '$' + data[column.key];
  }

  valueFormatterDate(data: Transaction, column): any{
    return this.datePipe.transform(data[column.key], 'dd/mm/yyyy hh:MM:ss');
  }

  openDrawer = (drawerName: string) => {
    this[drawerName] = true;
  }

  closeDrawer = (drawerName: string) => {
    this[drawerName] = false;
  }

  onClickAccept(): void{
    this.closeDrawer('drawerTicket');
  }


  valueFormatterTipo(data: Transaction, column): any{
    switch (data[column.key]) {
      case 'extraction':
        return 'Extraccion';
      case 'deposit':
        return 'Deposito';
    }
  }

  private initData(): void {
    this.user = this.userService.getLoggedUser();
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
