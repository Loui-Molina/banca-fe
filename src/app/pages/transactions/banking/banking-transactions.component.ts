import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BankingDto, Transaction, TransactionDto, TransactionsService} from 'local-packages/banca-api';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';
import {Column} from '../../../components/abm/abm.component';

@Component({
  selector: 'app-banking-transactions',
  templateUrl: './banking-transactions.component.html',
  styleUrls: ['./banking-transactions.component.scss']
})
export class BankingTransactionsComponent implements OnInit {
  columns: Column[] = [
    { title: 'TRANSACTIONS.LIST.DATE',
      key: 'createdAt',
      valueFormatter: (item, column) => this.valueFormatterDate(item, column),
      showSearch: true,
      searchType: 'date-range'
    },
    {
      title: 'TRANSACTIONS.LIST.ORIGIN',
      key: 'originName',
      showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.DESTINATION',
      key: 'destinationName',
      showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.DESCRIPTION',
      key: 'description',
      showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.AMOUNT',
      type: 'numeric',
      key: 'amount',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.LAST_BALANCE',
      type: 'numeric',
      key: 'lastBalance',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.ACTUAL_BALANCE',
      type: 'numeric',
      key: 'actualBalance',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.TYPE',
      key: 'type',
      valueFormatter: (item, column) => this.valueFormatterTipo(item, column),
      showSearch: true,
      searchType: 'select',
      searchOptions: [
        // {value: 'adjust', label: 'TRANSACTIONS.LIST.ADJUST'},
        {value: 'credit', label: 'TRANSACTIONS.LIST.CREDIT'},
        {value: 'debit', label: 'TRANSACTIONS.LIST.DEBIT'},
      ]
    }
  ];

  fetcher: Observable<TransactionDto[]> = this.transactionsService.transactionControllerGetAll();

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
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
