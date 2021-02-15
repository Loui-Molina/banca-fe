import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {Banking, CreateTransactionDto, Transaction, TransactionsService} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import TypeEnum = Transaction.TypeEnum;


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
      description: this.typeSelected === this.type.Credit ? 'Add balance to a user' : 'Remove balance to a user',
    };
    this.transactionsService.transactionControllerCreateTransactionBanking(body).subscribe(value => {
      this.loading = false;
      this.messageService.create('success', 'Transaccion realizada correctamente');
      this.destroyModal();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
