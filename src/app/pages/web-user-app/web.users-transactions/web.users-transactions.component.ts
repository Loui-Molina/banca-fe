import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayInterface} from '../../bettingPanel/bettingPanel.component';
import {BankingLotteryDto, Play, PlayNumbers, TransactionDto, TransactionsService} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {getCombinations, reverseString, showParsedNumbers, uuidv4} from '../../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-web.users-transactions',
  templateUrl: './web.users-transactions.component.html',
  styleUrls: ['./web.users-transactions.component.scss']
})
export class WebUsersTransactionsComponent implements OnInit {
  transactions: TransactionDto[] = [];
  selectedTransaction: TransactionDto;
  loading = true;
  modalConfirm = false;
  constructor(private route: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              private transactionsService: TransactionsService,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.transactionsService.transactionControllerGetAll().subscribe(data => {
      this.loading = false;
      this.transactions = data;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  goBack(): void {
    this.router.navigate(['app/main']);
  }

  openTransaction(transaction: TransactionDto): void {
    this.selectedTransaction = transaction;
    this.modalConfirm = true;
  }

  closeTransaction(): void {
    this.modalConfirm = false;
    this.selectedTransaction = null;
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}