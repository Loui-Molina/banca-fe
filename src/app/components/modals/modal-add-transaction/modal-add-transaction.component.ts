import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {
  AuthPasswordService, Banking, BankingService,
  ChangePasswordDto,
  CreateTransactionDto,
  Transaction,
  TransactionsService
} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import {UserService} from '../../../services/user.service';


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
      type: 'credit',
      amount: this.amount,
      originId: this.bankingId,
      originObject: OriginObjectEnum.Banking,
      destinationId: this.webUserId,
      destinationObject: OriginObjectEnum.Webuser,
      description: 'Add balance to a user',
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
