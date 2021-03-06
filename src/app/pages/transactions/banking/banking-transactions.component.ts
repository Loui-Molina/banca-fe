import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Transaction, TransactionDto, TransactionsService} from 'local-packages/banca-api';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-banking-transactions',
  templateUrl: './banking-transactions.component.html',
  styleUrls: ['./banking-transactions.component.scss']
})
export class BankingTransactionsComponent implements OnInit {

  loading = false;
  columns = [
    {title: 'TRANSACTIONS.LIST.DATE', key: 'createdAt', valueFormatter: (item, column) => this.valueFormatterDate(item, column)},
    {title: 'TRANSACTIONS.LIST.ORIGIN', key: 'originName'},
    {title: 'TRANSACTIONS.LIST.DESTINATION', key: 'destinationName'},
    {title: 'TRANSACTIONS.LIST.DESCRIPTION', key: 'description'},
    {title: 'TRANSACTIONS.LIST.AMOUNT', type: 'numeric', key: 'amount', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'TRANSACTIONS.LIST.LAST_BALANCE', type: 'numeric', key: 'lastBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'TRANSACTIONS.LIST.ACTUAL_BALANCE', type: 'numeric', key: 'actualBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'TRANSACTIONS.LIST.TYPE', key: 'type', valueFormatter: (item, column) => this.valueFormatterTipo(item, column)}
  ];
  transactions: TransactionDto[] = [];

  constructor(private datePipe: DatePipe,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private modalService: NzModalService,
              private messageService: NzMessageService,
              private transactionsService: TransactionsService
  ) {
  }

  valueFormatter(data: Transaction, column): any {
    return '$' + data[column.key];
  }

  valueFormatterDate(data: Transaction, column): any {
    return this.datePipe.transform(data[column.key], 'dd/MM/yyyy hh:mm');
  }

  valueFormatterTipo(data: Transaction, column): any {
    switch (data.type){
      case 'adjust':
        return this.ts('TRANSACTIONS.LIST.ADJUST');
      case 'credit':
        return this.ts('TRANSACTIONS.LIST.CREDIT');
      case 'debit':
        return this.ts('TRANSACTIONS.LIST.DEBIT');
      default:
        return data[column.key];
    }
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.loading = true;
    this.initDataSync().subscribe(responseList => {
      this.transactions = responseList[0];
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private initDataSync(): Observable<any[]> {
    const transactionControllerGetAll = this.transactionsService.transactionControllerGetAll();
    return forkJoin([
      transactionControllerGetAll
    ]);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
