import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {
  BankingDto,
  BankingService,
  ConsortiumDto,
  ConsortiumsService, CreateTransactionDto,
  Transaction, TransactionDto,
  TransactionsService,
  User
} from '../../../../local-packages/banca-api';
import {UserInterface, UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import DestinationObjectEnum = Transaction.DestinationObjectEnum;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';
import TypeEnum = TransactionDto.TypeEnum;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

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

  loading = false;
  formTransaction: FormGroup;
  drawerTransaction = false;
  user: UserInterface;
  userRole = User.RoleEnum;
  columns = [
    {title: 'Fecha', key: 'createdAt', valueFormatter: (item, column) => this.valueFormatterDate(item, column)},
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
    if (!this.formTransaction.valid){
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

  onClickAcceptSubmit(): void{
    this.loading = true;
    const transaction: CreateTransactionDto = {
      amount: this.formTransaction.value.amount,
      originObject: this.formTransaction.value.originObject,
      originId: this.formTransaction.value.originId,
      destinationId: this.formTransaction.value.destinationId,
      destinationObject: this.formTransaction.value.destinationObject
    };
    this.transactionsService.transactionControllerCreate(transaction).subscribe(value => {
      this.loading = false;
      this.messageService.create('success', 'Transaccion realizada correctamente');
      this.closeDrawer('drawerTransaction');
    }, error => {
      this.loading = false;
    });
  }

  onChangeOrigen($event): void{
    this.formTransaction.controls.originId.setValue(null);
  }

  onChangeDestination($event): void{
    this.formTransaction.controls.destinationId.setValue(null);
  }


  valueFormatterTipo(data: Transaction, column): any{
    return data[column.key];
  }

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    this.loading = true;
    this.initDataSync().subscribe(responseList => {
      this.transactions = responseList[0];
      this.consortiums = responseList[1];
      this.bankings = responseList[2];
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private initDataSync(): Observable<any[]> {
    const transactionControllerGetAll = this.transactionsService.transactionControllerGetAll();
    const consortiumControllerGetAll = this.consortiumsService.consortiumControllerGetAll();
    const bankingControllerFindAll = this.bankingService.bankingControllerFindAll();
    return forkJoin([
      transactionControllerGetAll,
      consortiumControllerGetAll,
      bankingControllerFindAll
    ]);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
