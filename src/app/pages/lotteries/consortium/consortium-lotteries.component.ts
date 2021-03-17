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
  selector: 'app-lotteries-consortium',
  templateUrl: './consortium-lotteries.component.html',
  styleUrls: ['./consortium-lotteries.component.scss']
})
export class ConsortiumLotteriesComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private messageService: NzMessageService,
    private modal: NzModalService,
    private lotteriesService: ConsortiumLotteriesService,
    private bankingService: BankingService,
    private datePipe: DatePipe,
  ) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  columns: Column[] = [
    {
      title: 'LOTTERIES.LIST.NAME',
      key: 'name',
      showSearch: true,
    },
    {
      title: 'LOTTERIES.LIST.ALIAS',
      key: 'nickname'
    },
    {
      title: 'LOTTERIES.LIST.PLAY_TIME',
      key: 'playTime',
      valueFormatter: (data) => this.datePipe.transform(data.playTime, 'HH:mm')

    },
    {
      title: 'LOTTERIES.LIST.OPEN_TIME',
      key: 'openTime',
      valueFormatter: (data) => this.datePipe.transform(data.openTime, 'HH:mm')

    },
    {
      title: 'LOTTERIES.LIST.CLOSE_TIME',
      key: 'closeTime',
      valueFormatter: (data) => this.datePipe.transform(data.closeTime, 'HH:mm')

    },
    {
      title: 'LOTTERIES.LIST.STATUS',
      key: 'status',
      valueFormatter: (data) => (data.status) ? this.ts('LOTTERIES.LIST.ENABLED') : this.ts('LOTTERIES.LIST.DISABLED'),
      showSearch: true,
      searchType: 'select',
      searchOptions: [
        {value: true, label: 'LOTTERIES.LIST.ENABLED'},
        {value: false, label: 'LOTTERIES.LIST.DISABLED'},
      ]
    },
    {
      title: 'LOTTERIES.LIST.COLOR',
      key: 'color',
      component: 'color'
    }
    ];

  fetcher: Observable<ConsortiumLotteryDto[]> = this.lotteriesService.consortiumLotteryControllerGetAll();

  lotteries: ConsortiumLotteryDto[] = [];

  loading = false;

  bankings: BankingDto[] = [];

  days = ConsortiumLotteryDto.DayEnum;

  bankingsSelected: BankingDto[] = [];

  formABM: FormGroup;

  defaultForm = {
    bankings: null,
    [PrizeLimitPlayTypeEnum.First]: null,
    [PrizeLimitPlayTypeEnum.Second]: null,
    [PrizeLimitPlayTypeEnum.Third]: null,
    [PrizeLimitPlayTypeEnum.Double]: null,
    [PrizeLimitPlayTypeEnum.Pale]: null,
    [PrizeLimitPlayTypeEnum.PaleTwoThree]: null,
    [PrizeLimitPlayTypeEnum.Triplet]: null,
    [PrizeLimitPlayTypeEnum.TwoNumbers]: null,
    [PrizeLimitPlayTypeEnum.SuperPale]: null,


    ['betting.' + BettingLimitPlayTypeEnum.Direct]: null,
    ['betting.' + BettingLimitPlayTypeEnum.Pale]: null,
    ['betting.' + BettingLimitPlayTypeEnum.Tripleta]: null,

    ['status.' + PrizeLimitPlayTypeEnum.First]: null,
    ['status.' + PrizeLimitPlayTypeEnum.Second]: null,
    ['status.' + PrizeLimitPlayTypeEnum.Third]: null,
    ['status.' + PrizeLimitPlayTypeEnum.Double]: null,
    ['status.' + PrizeLimitPlayTypeEnum.Pale]: null,
    ['status.' + PrizeLimitPlayTypeEnum.PaleTwoThree]: null,
    ['status.' + PrizeLimitPlayTypeEnum.Triplet]: null,
    ['status.' + PrizeLimitPlayTypeEnum.TwoNumbers]: null,
    ['status.' + PrizeLimitPlayTypeEnum.SuperPale]: null,


    ['status.betting.' + BettingLimitPlayTypeEnum.Direct]: null,
    ['status.betting.' + BettingLimitPlayTypeEnum.Pale]: null,
    ['status.betting.' + BettingLimitPlayTypeEnum.Tripleta]: null,

    blockedNumbers: [{
      id: null,
      controlInstance: null,
      number: null,
      dates: null
    }]
  };

  availablePlays = [
    {title: 'First', key: PrizeLimitPlayTypeEnum.First},
    {title: 'Second', key: PrizeLimitPlayTypeEnum.Second},
    {title: 'Third', key: PrizeLimitPlayTypeEnum.Third},
    {title: 'Double', key: PrizeLimitPlayTypeEnum.Double},
    {title: 'Pale', key: PrizeLimitPlayTypeEnum.Pale},
    {title: 'PaleTwoThree', key: PrizeLimitPlayTypeEnum.PaleTwoThree},
    {title: 'Triplet', key: PrizeLimitPlayTypeEnum.Triplet},
    {title: 'TwoNumbers', key: PrizeLimitPlayTypeEnum.TwoNumbers},
    {title: 'SuperPale', key: PrizeLimitPlayTypeEnum.SuperPale}
  ];

  availableBettingPlays = [
    {title: 'Direct', key: 'betting.' + BettingLimitPlayTypeEnum.Direct},
    {title: 'Pale', key: 'betting.' + BettingLimitPlayTypeEnum.Pale},
    {title: 'Triplet', key: 'betting.' + BettingLimitPlayTypeEnum.Tripleta}
  ];
  ranges: any = {[this.translateService.instant('Fin de mes')]: [new Date(), endOfMonth(new Date())]};


  fetcherUpdate: (item) => Observable<ConsortiumUpdateLotteryDto> = (item) => this.lotteriesService.consortiumLotteryControllerUpdate(item);

  onChangeBancas($event): void {
    if ($event) {
      this.bankingsSelected = this.bankings.filter(banking => $event.includes(banking._id));
    } else {
      this.bankingsSelected = [];
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.bankingService.bankingsControllerFindAll().subscribe(data => {
      this.bankings = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  setValueForm = (mode, defaultForm, visibleObject) => {
    const prizeLimits = visibleObject.prizeLimits;
    const bettingLimits = visibleObject.bettingLimits;
    const form = {
      bankings: visibleObject.bankings ? visibleObject.bankings : [],
      blockedNumbers: visibleObject.blockedNumbers ? visibleObject.blockedNumbers : []
    };


    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availablePlays.length; i++) {
      const playType = this.availablePlays[i];
      const item = prizeLimits ? prizeLimits.find(prizeLimit => prizeLimit.playType === playType.key) : null;
      form[playType.key] = item ? item.paymentAmount : null;
      form['status.' + playType.key] = item ? item.status : false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availableBettingPlays.length; i++) {
      const playType = this.availableBettingPlays[i];
      const key = playType.key.split('.')[1];
      const item = bettingLimits ? bettingLimits.find(bettingLimit => bettingLimit.playType === key) : null;
      form[playType.key] = item ? item.betAmount : null;
      form['status.' + playType.key] = item ? item.status : false;
    }

    return form;
  };

  parseData = (mode, valueForm, visibleObject) => {
    const prizeLimits: PrizeLimitDto[] = [];
    const bettingLimits: BettingLimitDto[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availablePlays.length; i++) {
      const playTipe = this.availablePlays[i];
      const prizeLimit = this.createPrizeLimit(valueForm, playTipe.key);
      if (prizeLimit) {
        prizeLimits.push(prizeLimit);
      }
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availableBettingPlays.length; i++) {
      const playType = this.availableBettingPlays[i];
      const bettingLimit = this.createBettingLimit(valueForm, playType.key);
      if (bettingLimit) {
        bettingLimits.push(bettingLimit);
      }
    }
    return {
      _id: visibleObject._id,
      bankings: valueForm.bankings,
      prizeLimits,
      bettingLimits,
      blockedNumbers: valueForm.blockedNumbers
    };
  };

  createPrizeLimit(valueForm, playType): PrizeLimitDto {
    if (valueForm[playType] === null || valueForm[playType] === undefined) {
      return null;
    }
    return {
      playType,
      paymentAmount: valueForm[playType],
      status: valueForm['status.' + playType]
    };
  }

  createBettingLimit(valueForm, playType): BettingLimitDto {
    if (valueForm[playType] === null || valueForm[playType] === undefined) {
      return null;
    }
    const key = playType.split('.')[1];
    return {
      playType: key,
      betAmount: valueForm[playType],
      status: valueForm['status.' + playType]
    };
  }

  addBlocking(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.blockedNumbers.length > 0 ? this.blockedNumbers[this.blockedNumbers.length - 1].id + 1 : 0;
    const control: BlockedNumberI = {
      dates: [],
      numbers: null,
      id,
      controlInstance: `blocking${id}`
    };
    this.blockedNumbers.push(control);
  }

  removeBlocking(i: BlockedNumberI, e: MouseEvent): void {
    if (this.blockedNumbers.length > 1) {
      const index = this.blockedNumbers.indexOf(i);
      this.blockedNumbers.splice(index, 1);
      this.formABM.removeControl(i.controlInstance);
    }
  }

  blockedDisabledDates = (date: Date) => {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;

  };

  get blockedNumbers(): BlockedNumberI[] {
    return this.formABM?.controls?.blockedNumbers?.value;
  }

  private ts(key): string {
    return this.translateService.instant(key);
  }
}

export interface BlockedNumberI {
  id: number;
  controlInstance: string;
  numbers: [];
  dates: [];
}

