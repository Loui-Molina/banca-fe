import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {
  BankingDto,
  BankingService,
  ConsortiumDto,
  ConsortiumsService,
  CreateTransactionDto,
  Transaction,
  TransactionDto,
  TransactionsService
} from 'local-packages/banca-api';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import DestinationObjectEnum = Transaction.DestinationObjectEnum;
import TypeEnum = TransactionDto.TypeEnum;

@Component({
  selector: 'app-consortium-transactions',
  templateUrl: './consortium-transactions.component.html',
  styleUrls: ['./consortium-transactions.component.scss']
})
export class ConsortiumTransactionsComponent implements OnInit {

  loading = false;
  formTransaction: FormGroup;
  drawerTransaction = false;
  columns = [
    {title: 'Fecha', key: 'createdAt', valueFormatter: (item, column) => this.valueFormatterDate(item, column)},
    {title: 'Origen', key: 'originName'},
    {title: 'Destino', key: 'destinationName'},
    {title: 'Monto', key: 'amount', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Ultimo balance', key: 'lastBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Balance actual', key: 'actualBalance', valueFormatter: (item, column) => this.valueFormatter(item, column)},
    {title: 'Tipo', key: 'type', valueFormatter: (item, column) => this.valueFormatterTipo(item, column)}
  ];
  transactions: TransactionDto[] = [];
  consortiums: ConsortiumDto[] = [];
  bankings: BankingDto[] = [];
  originObjectEnum = OriginObjectEnum;
  destinationObjectEnum = DestinationObjectEnum;
  transactionEnum = TypeEnum;

  constructor(private datePipe: DatePipe,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private modalService: NzModalService,
              private messageService: NzMessageService,
              private transactionsService: TransactionsService,
              private consortiumsService: ConsortiumsService,
              private bankingService: BankingService,
  ) {
    this.formTransaction = this.formBuilder.group(
      {
        originObject: [null, [Validators.required]],
        originId: [null, [Validators.required]],
        destinationId: [null, [Validators.required]],
        destinationObject: [null, [Validators.required]],
        amount: [null, [Validators.required, Validators.min(1)]]
      }
    );
  }

  valueFormatter(data: Transaction, column): any {
    return '$' + data[column.key];
  }

  valueFormatterDate(data: Transaction, column): any {
    return this.datePipe.transform(data[column.key], 'dd/MM/yyyy hh:mm:ss');
  }

  openDrawer = (drawerName: string) => {
    this[drawerName] = true;
  };

  closeDrawer = (drawerName: string) => {
    this[drawerName] = false;
  };

  onClickAccept(): void {
    if (!this.formTransaction.valid) {
      return;
    }
    this.modalService.success({
      nzTitle: 'Confirmar transferencia',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onClickAcceptSubmit(),
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onClickAcceptSubmit(): void {
    this.loading = true;
    const transaction: CreateTransactionDto = {
      amount: this.formTransaction.value.amount,
      originObject: this.formTransaction.value.originObject,
      originId: this.formTransaction.value.originId,
      destinationId: this.formTransaction.value.destinationId,
      destinationObject: this.formTransaction.value.destinationObject
    };
    this.transactionsService.transactionControllerCreateTransactionConsortium(transaction).subscribe(value => {
      this.loading = false;
      this.messageService.create('success', 'Transaccion realizada correctamente');
      this.closeDrawer('drawerTransaction');
      this.init();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  onChangeOrigen($event): void {
    if (this.formTransaction.value.originObject === this.originObjectEnum.Consortium) {
      this.formTransaction.controls.destinationId.setValue(null);
      this.formTransaction.controls.destinationObject.setValue(this.destinationObjectEnum.Banking);
    } else if (this.formTransaction.value.originObject === this.originObjectEnum.Banking) {
      this.formTransaction.controls.destinationId.setValue(null);
      this.formTransaction.controls.destinationObject.setValue(this.destinationObjectEnum.Consortium);
    }
    this.formTransaction.controls.originId.setValue(null);
  }

  onChangeOrigenId($event): void {
    if (this.formTransaction.value.originObject === this.originObjectEnum.Consortium) {
      this.formTransaction.controls.destinationId.setValue(null);
      this.formTransaction.controls.destinationObject.setValue(this.destinationObjectEnum.Banking);
    } else if (this.formTransaction.value.originObject === this.originObjectEnum.Banking) {
      this.formTransaction.controls.destinationId.setValue(null);
      this.formTransaction.controls.destinationObject.setValue(this.destinationObjectEnum.Consortium);
    } else {
      this.formTransaction.controls.destinationObject.setValue(null);
      this.formTransaction.controls.destinationId.setValue(null);
    }
  }

  getFilteredConsortiums(): ConsortiumDto[] {
    const banking = this.bankings.filter(banking => banking._id === this.formTransaction.value.originId).pop();
    if (!banking) {
      return [];
    }
    return this.consortiums.filter(consortium => consortium._id === banking.consortiumId);
  }

  getFilteredBankings(): BankingDto[] {
    const consortium = this.consortiums.filter(consortium => consortium._id === this.formTransaction.value.originId).pop();
    if (!consortium) {
      return [];
    }
    return this.bankings.filter(banking => banking.consortiumId === consortium._id);
  }


  onChangeDestination($event): void {
    this.formTransaction.controls.destinationId.setValue(null);
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
      this.consortiums = [responseList[1]];
      this.bankings = responseList[2];
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private initDataSync(): Observable<any[]> {
    const transactionControllerGetAll = this.transactionsService.transactionControllerGetAll();
    const consortium = this.consortiumsService.consortiumControllerGetConsortiumOfUser();
    const bankingControllerFindAll = this.bankingService.bankingControllerFindAll();
    return forkJoin([
      transactionControllerGetAll,
      consortium,
      bankingControllerFindAll
    ]);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
