import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {
  BankingDto,
  BankingService,
  BettingLimitDto,
  ConsortiumLotteriesService,
  ConsortiumLotteryDto,
  ConsortiumUpdateLotteryDto,
  PrizeLimitDto
} from 'local-packages/banca-api';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {HttpErrorResponse} from '@angular/common/http';
import endOfMonth from 'date-fns/endOfMonth';
import {DatePipe} from '@angular/common';
import PrizeLimitPlayTypeEnum = PrizeLimitDto.PlayTypeEnum;
import BettingLimitPlayTypeEnum = BettingLimitDto.PlayTypeEnum;
import {Column} from '../../../components/abm/abm.component';


@Component({
  selector: 'app-balance-consortium',
  templateUrl: './consortium-balance.component.html',
  styleUrls: ['./consortium-balance.component.scss']
})
export class ConsortiumBalanceComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}

