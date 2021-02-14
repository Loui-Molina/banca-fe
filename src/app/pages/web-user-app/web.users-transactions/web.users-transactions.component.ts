import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayInterface} from '../../bettingPanel/bettingPanel.component';
import {BankingLotteryDto, Play, PlayNumbers} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {getCombinations, reverseString, showParsedNumbers, uuidv4} from '../../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-web.users-transactions',
  templateUrl: './web.users-transactions.component.html',
  styleUrls: ['./web.users-transactions.component.scss']
})
export class WebUsersTransactionsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['app/main']);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
