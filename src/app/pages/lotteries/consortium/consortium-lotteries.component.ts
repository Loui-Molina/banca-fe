import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {
  AdminLotteryDto,
  BankingDto,
  BankingService, BettingLimit,
  ConsortiumLotteriesService,
  ConsortiumLotteryDto, ConsortiumUpdateLotteryDto,
  Lottery, PrizeLimit
} from '../../../../../local-packages/banca-api';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {HttpErrorResponse} from '@angular/common/http';
import PrizeLimitPlayTypeEnum = PrizeLimit.PlayTypeEnum;
import BettingLimitPlayTypeEnum = BettingLimit.PlayTypeEnum;

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
  ) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  columns = [
    {
      title: 'Nombre',
      key: 'name'
    },
    {
      title: 'Alias',
      key: 'nickname'
    },
    {
      title: 'Hora de juego',
      key: 'playTime'
    },
    {
      title: 'Apertura',
      key: 'openTime'
    },
    {
      title: 'Cierre',
      key: 'closeTime'
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitada' : 'Inhabilitada'
    }];
  fetcher: Observable<ConsortiumLotteryDto[]> = this.lotteriesService.consortiumLotteryControllerGetAll();
  lotteries: Lottery[] = [];
  loading = false;
  bankings: BankingDto[] = [];
  days = AdminLotteryDto.DayEnum;
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
    {title: 'Tripleta', key: 'betting.' + BettingLimitPlayTypeEnum.Tripleta}
  ];
  fetcherUpdate: (item) => Observable<ConsortiumUpdateLotteryDto> = (item) => this.lotteriesService.consortiumLotteryControllerUpdate(item);

  onChangeBancas($event): void{
    if ($event){
      this.bankingsSelected = this.bankings.filter(banking => $event.includes(banking._id));
    } else {
      this.bankingsSelected = [];
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.bankingService.bankingControllerFindAll().subscribe(data => {
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
      bankings: visibleObject.bankings
    };


    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availablePlays.length; i++){
      const playType = this.availablePlays[i];
      const item = prizeLimits ? prizeLimits.find(prizeLimit => prizeLimit.playType === playType.key) : null;
      form[playType.key] = item ? item.paymentAmount : null;
      form['status.' + playType.key] = item ? item.status : false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.availableBettingPlays.length; i++){
      const playType = this.availableBettingPlays[i];
      const key = playType.key.split('.')[1];
      const item = bettingLimits ? bettingLimits.find(bettingLimit => bettingLimit.playType === key) : null;
      form[playType.key] = item ? item.betAmount : null;
      form['status.' + playType.key] = item ? item.status : false;
    }

    return form;
  }

  parseData = (mode, valueForm, visibleObject) => {
    const prizeLimits: PrizeLimit[] = [];
    const bettingLimits: BettingLimit[] = [];

    // tslint:disable-next-line:forin prefer-for-of
    for (let i = 0; i < this.availablePlays.length; i++){
      const playTipe = this.availablePlays[i];
      const prizeLimit = this.createPrizeLimit(valueForm, playTipe.key);
      if (prizeLimit){
        prizeLimits.push(prizeLimit);
      }
    }
    // tslint:disable-next-line:forin prefer-for-of
    for (let i = 0; i < this.availableBettingPlays.length; i++){
      const playType = this.availableBettingPlays[i];
      const bettingLimit = this.createBettingLimit(valueForm, playType.key);
      if (bettingLimit){
        bettingLimits.push(bettingLimit);
      }
    }
    return {
      _id: visibleObject._id,
      bankings: valueForm.bankings,
      prizeLimits,
      bettingLimits
    };
  }

  createPrizeLimit(valueForm, playType): PrizeLimit{
    if (valueForm[playType] === null || valueForm[playType] === undefined){
      return null;
    }
    return {
      playType,
      paymentAmount: valueForm[playType],
      status: valueForm['status.' + playType]
    };
  }

  createBettingLimit(valueForm, playType): BettingLimit{
    if (valueForm[playType] === null || valueForm[playType] === undefined){
      return null;
    }
    const key = playType.split('.')[1];
    return {
      playType: key,
      betAmount: valueForm[playType],
      status: valueForm['status.' + playType]
    };
  }
}
