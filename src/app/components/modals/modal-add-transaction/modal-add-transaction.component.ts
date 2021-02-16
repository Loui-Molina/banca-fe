import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {Banking, CreateTransactionDto, Transaction, TransactionsService} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import TypeEnum = Transaction.TypeEnum;
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-modal-add-transaction',
  templateUrl: './modal-add-transaction.component.html',
  styleUrls: ['./modal-add-transaction.component.scss']
})
export class ModalAddTransactionComponent implements OnInit {
  @Input()
  webUserId: object;

  @Input()
  bankingId: object;

  amount: number;
  type = TypeEnum;
  typeSelected: TypeEnum;
  loading: boolean;
  banking: Banking;

  constructor(private modal: NzModalRef,
              private transactionsService: TransactionsService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.destroyModal();
  }

  accept(): void {
    this.loading = true;
    const body: CreateTransactionDto = {
      type: this.typeSelected,
      amount: this.amount,
      originId: this.typeSelected === this.type.Credit ? this.webUserId : this.bankingId,
      originObject: this.typeSelected === this.type.Credit ? OriginObjectEnum.Webuser : OriginObjectEnum.Banking,
      destinationId: this.typeSelected === this.type.Credit ? this.bankingId : this.webUserId,
      destinationObject: this.typeSelected === this.type.Credit ? OriginObjectEnum.Banking : OriginObjectEnum.Webuser,
      description: this.typeSelected === this.type.Credit ? this.ts('UTILS.DEPOSIT_BALANCE') : this.ts('UTILS.WITHDRAW_BALANCE'),
    };
    this.transactionsService.transactionControllerCreateTransactionBanking(body).subscribe(value => {
      this.loading = false;
      this.messageService.create('success', this.ts('UTILS.TRANSACTION_SUCCESS'));
      this.destroyModal();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
