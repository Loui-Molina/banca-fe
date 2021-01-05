import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Transaction, TransactionsService, User} from '../../../../local-packages/banca-api';
import {UserInterface, UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private datePipe: DatePipe, private userService: UserService, private transactionsService: TransactionsService) {
  }

  loading = false;
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
  transactions: Transaction[] = [];

  valueFormatter(data: Transaction, column): any{
    return '$' + data[column.key];
  }

  valueFormatterDate(data: Transaction, column): any{
    return this.datePipe.transform(data[column.key], 'dd/MM/yyyy hh:mm:ss');
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

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    this.loading = true;
    this.transactionsService.transactionControllerGetAll().subscribe(res => {
      this.transactions = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }
}
