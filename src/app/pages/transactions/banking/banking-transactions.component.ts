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
    {title: 'Fecha', key: 'createdAt', valueFormatter: (item, column) => this.valueFormatterDate(item, column)},
    {title: 'Origen', key: 'originName'},
    {title: 'Destino', key: 'destinationName'},
    {title: 'Descripcion', key: 'description'},
    {title: 'Monto', type: 'numeric', key: 'amount', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Ultimo balance', type: 'numeric', key: 'lastBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Balance actual', type: 'numeric', key: 'actualBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Tipo', key: 'type', valueFormatter: (item, column) => this.valueFormatterTipo(item, column)}
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
    return this.datePipe.transform(data[column.key], 'dd/MM/yyyy hh:mm:ss');
  }

  valueFormatterTipo(data: Transaction, column): any {
    return data[column.key];
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
