import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayInterface} from '../../bettingPanel/bettingPanel.component';
import {
  BankingLotteryDto, BettingPanelService, CreateBetDto, LimitVerifyDto,
  Play,
  PlayDto,
  PlayNumbers,
  WebUserLotteriesService,
  WebUserLotteryDto
} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {showParsedNumbers, uuidv4} from '../../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-web.users-lottery',
  templateUrl: './web.users-lottery.component.html',
  styleUrls: ['./web.users-lottery.component.scss']
})
export class WebUsersLotteryComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              private bettingPanelService: BettingPanelService,
              private webUserLotteriesService: WebUserLotteriesService,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
    this.route.params.subscribe(params => {
      this.lotteryId = params.id;
    });
  }
  @ViewChild('inputNumber', {static: false}) inputNumber: any;
  @ViewChild('inputAmount', {static: false}) inputAmount: any;
  lotteryId;
  interval;
  lottery: WebUserLotteryDto;
  plays: PlayInterface[] = [];
  limit = 100;
  loading = true;
  number: number;
  amount: number;
  loadingSearchLimit: boolean;

  a:number;

  ngOnInit(): void {
    this.reloadLotterys();
    this.interval = setInterval(() => {
      this.reloadLotterys();
    }, 30000);
  }

  onChangeCounter($event, lottery: BankingLotteryDto): void {
    if ($event.status === 3) {
      this.goBack();
      // this.messageService.create('warning', `La loteria ${lottery.name} ya no esta disponible`, {nzDuration: 3000});
    }
  }

  getSumBets(bets: PlayInterface[] | PlayDto[]): number {
    let sum = 0;
    // @ts-ignore
    bets.map(item => {
      sum += item.amount;
    });
    return sum;
  }


  private reloadLotterys(): void {
    this.webUserLotteriesService.webUserLotteryControllerGet(this.lotteryId).subscribe(data => {
      this.loading = false;
      this.lottery = data;
      if (!data.status || !data.leftTime) {
        this.goBack();
      }
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }


  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  goBack(): void {
    this.router.navigate(['app/main'] );
  }


  onKeyEnterNumber(): void {
    if (this.number != null && this.number > 0) {
      this.inputAmount.focus();
    }
  }

  onKeyEnterAmount(): void {
    this.onKeyEnter();
  }

  disabledBet(): boolean {
    if (!this.number || !this.amount || this.amount === 0 || this.loadingSearchLimit) {
      return true;
    }
    const amount = parseFloat(String(this.amount));
    if (this.limit != null && amount > this.limit) {
      return true;
    }
    return false;
  }

  onKeyEnter = () => {
    if (!this.disabledBet()) {
      this.createBet();
      this.resetBet();
    }
  }

  createBet(): void {
    if (!this.number) {
      return;
    }
    const amount = parseFloat(String(this.amount));
    if (!amount) {
      return;
    }
    const playsToCreate: PlayInterface[] = this.getPlaysToCreate(this.lottery, amount);

    // if (this.superPale && this.selectedLotterys.length !== 2) {
    //   this.messageService.create('error', 'Debe seleccionar 2 loterias');
    //   return;
    // }

    // tslint:disable-next-line:no-shadowed-variable
    // if (this.superPale) {
    //   playsToCreate = playsToCreate.filter(play => play.playType === 'pale');
    //   for (const play of playsToCreate) {
    //     play.playType = Play.PlayTypeEnum.SuperPale;
    //   }
    // }
    if (playsToCreate.length === 0) {
      this.messageService.create('error', 'Error de formato');
      return;
    }
    for (const play of playsToCreate) {
      this.newBet(play);
    }
  }

  deleteBet(play: PlayInterface): void {
    this.plays = this.plays.filter(item => item.uuid !== play.uuid);
  }
  searchLimit = () => {
    this.loadingSearchLimit = true;
    this.limit = null;
    const key = Math.random();
    this.a = key;
    setTimeout(() => {
      if (this.a !== key) {
        return;
      }
      if (this.number === null || this.number === undefined || !this.lottery) {
        this.loadingSearchLimit = false;
        return null;
      }
      this.loadingSearchLimit = true;
      const playsToCreate: PlayInterface[] = this.getPlaysToCreate(this.lottery, 0);
      const reqs: LimitVerifyDto[] = [];
      if (playsToCreate.length === 0) {
        this.loadingSearchLimit = false;
        return null;
      }
      for (const play of playsToCreate) {
        reqs.push({
          playType: play.playType,
          playNumbers: play.playNumbers,
          lotteryId: play.lotteryId.toString(),
        });
      }
      this.searchLimitSync(reqs).subscribe(responseArray => {
        let minor: number = null;
        for (const res of responseArray){
          if (res != null){
            if (minor === null || res < minor) {
              minor = res;
            }
          }
        }
        if (this.a !== key) {
          return;
        }
        this.loadingSearchLimit = false;
        this.limit = minor;
        if (this.amount > minor) {
          this.amount = null;
        }
      }, error => {
        this.loadingSearchLimit = false;
        throw new HttpErrorResponse(error);
      });
    }, 500);
  }

  private searchLimitSync(reqs: LimitVerifyDto[]): Observable<any[]> {
    const array = [];
    for (const req of reqs){
      array.push(this.bettingPanelService.bettingPanelControllerVerifyLimit(req));
    }
    return forkJoin(array);
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  }

  newBet(play: PlayInterface): void {
    const aux = [];
    this.plays.map(item => {
      if (
        item.playType !== play.playType ||
        Object.keys(item.playNumbers).length !== Object.keys(play.playNumbers).length
      ) {
        aux.push(item);
      } else {
        if (Object.values(item.playNumbers).filter(x => !Object.values(play.playNumbers).includes(x)).length !== 0) {
          aux.push(item);
        }
      }
    });
    aux.push(play);
    this.plays = aux;
  }

  resetBet(): void {
    this.number = null;
    this.inputNumber.focus();
  }

  getPlaysToCreate(lottery: BankingLotteryDto, amount: number): PlayInterface[] {
    const playsToCreate: PlayInterface[] = [];
    let type: Play.PlayTypeEnum = null;
    const numbers = this.number.toString();
    // Solo numeros
    const result = numbers.match(/.{1,2}/g);
    if (result && result.length <= 3) {
      if (result[result.length - 1].length === 1) {
        // Fixes last number
        result[result.length - 1] = result[result.length - 1];
      }
      const resultNumbers: number[] = result.map(item => parseInt(item, 0));
      let playNumbers: PlayNumbers = {};

      switch (resultNumbers.length) {
        case 1:
          type = Play.PlayTypeEnum.Direct;
          playNumbers = {first: resultNumbers[0]};
          break;
        case 2:
          type = Play.PlayTypeEnum.Pale;
          playNumbers = {first: resultNumbers[0], second: resultNumbers[1]};
          break;
        case 3:
          type = Play.PlayTypeEnum.Tripleta;
          playNumbers = {first: resultNumbers[0], second: resultNumbers[1], third: resultNumbers[2]};
          break;
      }
      playsToCreate.push({
        playNumbers,
        uuid: uuidv4(),
        playType: type,
        lotteryNickName: lottery.nickname,
        lotteryId: lottery._id,
        amount
      });
    }
    return playsToCreate;
  }

  submitBet(): void {
    this.modalService.success({
      nzTitle: 'Realizar apuesta',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onSubmitPayTicket(),
      nzOnCancel: () => {
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onSubmitPayTicket(): void{
    this.loading = true;
    const body: CreateBetDto = {
      plays: []
    };
    this.plays.map((item) => {
      body.plays.push({
        amount: item.amount,
        lotteryId: item.lotteryId,
        playType: item.playType,
        playNumbers: item.playNumbers,
      });
    });
    this.bettingPanelService.bettingPanelControllerCreateForWebUser(body).subscribe(data => {
      this.loading = false;
      this.router.navigate(['app/bets']);
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
