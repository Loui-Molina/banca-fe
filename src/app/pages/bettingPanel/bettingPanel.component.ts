import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  formatResult,
  getCombinations,
  printTicket,
  reverseString,
  showParsedNumbers,
  uuidv4
} from '../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  Banking,
  BankingLotteriesService,
  BankingLotteryDto,
  BankingService,
  BetDto,
  BettingLimit,
  BettingPanelService,
  CreateBetDto,
  LimitVerifyDto,
  Play,
  PlayDto,
  PlayNumbers,
  PrizeLimit,
  ResultDto,
  ResultsService,
  ResumeSellsDto
} from 'local-packages/banca-api';
import {forkJoin, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import PrizeLimitPlayTypeEnum = PrizeLimit.PlayTypeEnum;
import BettingLimitPlayTypeEnum = BettingLimit.PlayTypeEnum;
import {DrawerBetsComponent} from "./drawer-bets/drawer-bets.component";
import {DrawerBetComponent} from "./drawer-bet/drawer-bet.component";
import {DrawerHelpComponent} from "./drawer-help/drawer-help.component";
import {DrawerPayBetComponent} from "./drawer-pay-bet/drawer-pay-bet.component";
import {DrawerResumeSellsComponent} from "./drawer-resume-sells/drawer-resume-sells.component";
import {DrawerLotteriesComponent} from "./drawer-lotteries/drawer-lotteries.component";

@Component({
  selector: 'app-betting-panel',
  templateUrl: './bettingPanel.component.html',
  styleUrls: ['./bettingPanel.component.scss']
})
export class BettingPanelComponent implements OnInit, OnDestroy {
  @ViewChild('drawerBets') drawerBets: DrawerBetsComponent;
  @ViewChild('drawerBet') drawerBet: DrawerBetComponent;
  @ViewChild('drawerHelp') drawerHelp: DrawerHelpComponent;
  @ViewChild('drawerPayBet') drawerPayBet: DrawerPayBetComponent;
  @ViewChild('drawerResumeSells') drawerResumeSells: DrawerResumeSellsComponent;
  @ViewChild('drawerLotteryLimits') drawerLotteryLimits: DrawerLotteriesComponent;
  @ViewChild('inputNumber', {static: false}) inputNumber: ElementRef;
  @ViewChild('inputAmount', {static: false}) inputAmount: ElementRef;
  now = new Date();
  number: string = null;
  amount: number = null;
  payTicketValue: string = null;
  drawerCaja = false;
  modalOpened = false;
  modalConfirm = false;
  loadingSubmit = false;
  generatedBet: BetDto;

  panels = [
    {title: 'DIRECTO', types: [Play.PlayTypeEnum.Direct]},
    {title: 'PALE', types: [Play.PlayTypeEnum.Pale]},
    {title: 'TRIPLETA', types: [Play.PlayTypeEnum.Tripleta]},
    {title: 'SUPERPALE', types: [Play.PlayTypeEnum.SuperPale]}
  ];
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
  lotterys: BankingLotteryDto[] = [];
  banking: Banking;
  selectedLotterys: string[] = [];
  loading = false;
  superPale = false;
  reloadingResults = false;
  reloadingResumeSells = false;
  reloadingLotterys = false;
  limit: number;
  loadingSearchLimit = false;
  lastResults: ResultDto[] = [];
  betStatusEnum = BetDto.BetStatusEnum;
  plays: PlayInterface[] = [];
  lastInput = null;
  lastClick = null;
  interval;


  constructor(private modalService: NzModalService,
              private resultsService: ResultsService,
              private bankingLotteriesService: BankingLotteriesService,
              private bettingPanelService: BettingPanelService,
              private bankingService: BankingService,
              private datePipe: DatePipe,
              private translateService: TranslateService,
              private messageService: NzMessageService) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const drawers = [
      this.drawerBets,
      this.drawerBet,
      this.drawerHelp,
      this.drawerPayBet,
      this.drawerResumeSells,
      this.drawerLotteryLimits,
    ];
    for (const drawer of drawers){
      if (drawer.isVisible && drawer.isVisible()) {
        return;
      }
    }
    if (this.modalOpened) {
      return;
    }

    if (event.key === '/') {
      this.switchLotterys('A');
    }

    if (event.key === 'l' || event.key === 'L') {
      this.cleanAll();
    }

    if (event.key === '*') {
      if (this.lastClick === '*') {
        this.onSubmitBet();
      }
    }

    if (event.key === 'b' || event.key === 'B') {
      this.openDrawer(this.drawerBets, {});
    }

    if (event.key === 'h' || event.key === 'H') {
      this.openDrawer(this.drawerHelp, {});
    }

    if (event.key === 'c' || event.key === 'C') {
      this.openDrawer(this.drawerResumeSells, {});
    }

    if (event.key === 'p' || event.key === 'P') {
      this.openDrawer(this.drawerPayBet, {});
    }

    if (event.key === ' ') {
      this.onSubmitBet();
    }

    this.lastClick = event.key;
  }

  onChangeCounter($event, lottery: BankingLotteryDto): void {
    if ($event.status === 3) {
      // Se fitra si estaba seleccionada o seleccionada en una apuesta
      this.selectedLotterys = this.selectedLotterys.filter(id => id !== lottery._id.toString());
      this.plays = this.plays.filter(bet => bet.lotteryId.toString() !== lottery._id.toString());
      for (const lotteryItem of this.lotterys) {
        if (lotteryItem._id.toString() === lottery._id.toString()) {
          lotteryItem.status = false;
          lotteryItem.leftTime = 0;
        }
      }
      this.messageService.create('warning', `La loteria ${lottery.name} ya no esta disponible`, {nzDuration: 3000});
    }
  }

  regexPlay = (input) => {
    const match = input.value.match(/^(([0-9]+)?)+(\.|([Ss]+(([0-9]+)?)))?$/g);
    if (!match) {
      input.value = this.lastInput;
    }
    this.lastInput = input.value;
  }

  switchLotterys(type: string): void {
    if (type === 'A') {
      // SWITCH LOTTERYS
      const aux = [];
      // tslint:disable-next-line:prefer-for-of prefer-const
      const openLotterys = this.lotterys.filter(lottery => (lottery.status && lottery.leftTime > 0));
      for (let i = 0; i < openLotterys.length; i++) {
        const lottery = openLotterys[i];
        if (this.selectedLotterys.includes(lottery._id.toString())) {
          this.onChangeLottery(lottery, false);
          if (i < (openLotterys.length - 1)) {
            if (!aux.includes(openLotterys[i + 1]._id.toString())) {
              aux.push(openLotterys[i + 1]._id.toString());
            }
          } else {
            if (!aux.includes(openLotterys[0]._id.toString())) {
              aux.push(openLotterys[0]._id.toString());
            }
          }
        }
      }
      this.selectedLotterys = aux;
      if (this.selectedLotterys.length <= 0) {
        if (openLotterys.length > 0) {
          this.selectedLotterys = [openLotterys[0]._id.toString()];
        }
      }
    } else if (type === 'B') {
      // SWITCH LOTTERYS
      this.lotterys.map(lottery => {
        if (lottery.status && lottery.leftTime > 0) {
          this.onChangeLottery(lottery, !this.selectedLotterys.includes(lottery._id.toString()));
        }
      });
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.initDataSync().subscribe(responseList => {
      this.lastResults = responseList[0];
      this.lotterys = responseList[1];
      this.banking = responseList[2];
      this.startReloadResults();
      this.loading = false;
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

  onKeyEnter = () => {
    if (!this.disabledBet()) {
      this.createBet();
      this.resetBet();
    }
  }

  onCheckSuperPale = () => {
    this.superPale = !this.superPale;
  }

  onSubmitBet = () => {
    if (this.plays.length <= 0) {
      return;
    }
    this.modalOpened = true;
    this.modalConfirm = true;
    this.generatedBet = null;
  }

  closeModalConfirm(): void {
    this.modalOpened = false;
    this.modalConfirm = false;
    this.generatedBet = null;
  }

  onSubmitBetConfirm = () => {
    this.loadingSubmit = true;
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
    this.bettingPanelService.bettingPanelControllerCreate(body).subscribe(data => {
      this.generatedBet = data;
      this.plays = [];
      this.loadingSubmit = false;
    }, error => {
      this.loadingSubmit = false;
      throw new HttpErrorResponse(error);
    });
  }

  cleanAll = () => {
    this.number = null;
    this.amount = null;
    this.limit = null;
    this.plays = [];
    this.selectedLotterys = [];
  }


  onKeyEnterNumber = () => {
    if (this.number != null && this.number.length > 0) {
      this.inputAmount.nativeElement.focus();
    }
  }

  searchLimit = () => {
    this.loadingSearchLimit = true;
    this.limit = null;
    setTimeout(() => {
      if (this.number === null || this.number === undefined || this.selectedLotterys.length === 0) {
        this.loadingSearchLimit = false;
        return null;
      }
      this.loadingSearchLimit = true;
      let playsToCreate: PlayInterface[] = [];
      // tslint:disable-next-line:no-shadowed-variable
      for (const lottery of this.lotterys) {
        if (this.selectedLotterys.includes(lottery._id.toString())) {
          playsToCreate = playsToCreate.concat(this.getPlaysToCreate(lottery, 0));
        }
      }
      const reqs: LimitVerifyDto[] = [];
      if (playsToCreate.length === 0) {
        this.loadingSearchLimit = false;
        return null;
      }
      for (const play of playsToCreate) {
        const lottery = this.lotterys.filter(lot => play.lotteryId.toString() === lot._id.toString()).pop();
        reqs.push({
          playType: play.playType,
          playNumbers: play.playNumbers,
          lotteryId: lottery._id.toString(),
        });
      }
      this.searchLimitSync(reqs).subscribe(responseArray => {
        this.loadingSearchLimit = false;
        let minor: number;
        for (const res of responseArray){
          if (res != null){
            if (!minor || res < minor) {
              minor = res;
            }
          }
        }
        this.limit = minor;
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

  getPlaysToCreate(lottery: BankingLotteryDto, amount: number): PlayInterface[] {
    const playsToCreate: PlayInterface[] = [];
    let type: Play.PlayTypeEnum = null;
    const numbers = this.number.toUpperCase();
    if (numbers.indexOf('.') !== -1) {
      // Contiene '.' Ex: 22235. 2323.
      const result = numbers.split('.')[0].match(/.{1,2}/g);
      if (result[result.length - 1].length === 1) {
        // Fixes last number
        result[result.length - 1] = formatResult(parseInt(result[result.length - 1], 0));
      }
      if (result.length === 1) {
        // Solo un numero Ex: 23 32
        type = Play.PlayTypeEnum.Direct;
        playsToCreate.push({
          playNumbers: {first: parseInt(result[0], 0)},
          uuid: uuidv4(),
          playType: type,
          lotteryNickName: lottery.nickname,
          lotteryId: lottery._id,
          amount
        });
        playsToCreate.push({
          playNumbers: {first: parseInt(reverseString(result[0]), 0)},
          uuid: uuidv4(),
          playType: type,
          lotteryNickName: lottery.nickname,
          lotteryId: lottery._id,
          amount
        });
      }
      if (type === null && result.length > 0) {
        const combinations = getCombinations(result, 4, '-');
        for (const combination of combinations) {
          type = Play.PlayTypeEnum.Pale;
          const playString = combination.split('-');
          const playNumbers: number[] = playString.map(item => parseInt(item, 0));
          playsToCreate.push({
            playNumbers: {first: playNumbers[0], second: playNumbers[1], third: playNumbers[2]},
            uuid: uuidv4(),
            playType: type,
            lotteryNickName: lottery.nickname,
            lotteryId: lottery._id,
            amount
          });
        }
        // TODO mejorar combinaciones todavia no son correctas
      }
    } else if (numbers.indexOf('S') !== -1) {
      // Contiene S
      const result = numbers.split('S');
      if (result.length === 2) {
        // Solo si se tiene 2 numeros
        // tslint:disable-next-line:radix
        const A = parseInt(result[0]);
        // tslint:disable-next-line:radix
        const B = parseInt(result[1]);
        const from = A < B ? A : B;
        let to = A > B ? A : B;
        type = Play.PlayTypeEnum.Direct;
        if (to > 99) {
          to = 99;
        }
        // tslint:disable-next-line:radix
        for (let i = from; i <= to; i++) {
          playsToCreate.push({
            playNumbers: {first: i},
            uuid: uuidv4(),
            playType: type,
            lotteryNickName: lottery.nickname,
            lotteryId: lottery._id,
            amount
          });
        }
      }
    } else {
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
    }
    return playsToCreate;
  }

  createBet(): void {
    if (!this.number) {
      return;
    }
    const amount = parseFloat(String(this.amount));
    if (!amount) {
      return;
    }
    let playsToCreate: PlayInterface[] = [];

    if (this.superPale && this.selectedLotterys.length !== 2) {
      this.messageService.create('error', 'Debe seleccionar 2 loterias');
      return;
    }

    // tslint:disable-next-line:no-shadowed-variable
    for (const lottery of this.lotterys) {
      if (this.selectedLotterys.includes(lottery._id.toString())) {
        playsToCreate = playsToCreate.concat(this.getPlaysToCreate(lottery, amount));
      }
    }
    if (this.superPale) {
      playsToCreate = playsToCreate.filter(play => play.playType === 'pale');
      for (const play of playsToCreate) {
        play.playType = Play.PlayTypeEnum.SuperPale;
      }
    }
    if (playsToCreate.length === 0) {
      this.messageService.create('error', 'Error de formato');
      return;
    }
    for (const play of playsToCreate) {
      this.newBet(play);
    }
  }

  formatResult(value: number): string {
    return formatResult(value);
  }

  newBet(play: PlayInterface): void {
    const aux = [];
    this.plays.map(item => {
      if (
        item.lotteryId.toString() !== play.lotteryId.toString() ||
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
    this.inputNumber.nativeElement.focus();
  }

  openDrawer = (drawer, params: {}) => {
    drawer.open(params);
  }

  closeDrawer = (drawer) => {
    drawer.close();
  }

  disabledBet(): boolean {
    if (!this.number || !this.amount || this.amount === 0 || this.selectedLotterys.length === 0 || this.loadingSearchLimit) {
      return true;
    }
    const amount = parseFloat(String(this.amount));
    if (this.limit != null && amount > this.limit) {
      return true;
    }
    return false;
  }

  getFilteredBets(type: Play.PlayTypeEnum[]): PlayInterface[] {
    return this.plays.filter(play => type.includes(play.playType));
  }

  onChangeLottery(lottery: BankingLotteryDto, $event): void {
    if ($event) {
      if (!this.selectedLotterys.includes(lottery._id.toString())) {
        this.selectedLotterys.push(lottery._id.toString());
      }
    } else {
      if (this.selectedLotterys.includes(lottery._id.toString())) {
        this.selectedLotterys = this.selectedLotterys.filter(id => id !== lottery._id.toString());
      }
    }
    this.searchLimit();
  }

  deleteBet(play: PlayInterface): void {
    this.plays = this.plays.filter(item => item.uuid !== play.uuid);
  }

  openTicket = (bet: BetDto) => {
    this.openDrawer(this.drawerBet, {bet});
  }

  getSendWhatsApp = (bet: BetDto) => {
    // TODO Ver si tiene user y ponerle el numero como &phone=+5493543573840
    if (bet && bet._id) {
      let text = 'Hola! 👋🏼👋🏼 \n\n'; // TODO poner nombre de usuario
      text += 'Este es el detalle de tu ticket 🎟️:\n';
      text += '🆔:  *' + bet._id.toString() + '*\n';
      text += '🆔 SN:  *' + bet.sn + '*\n';
      text += '📅: ' + this.datePipe.transform(bet.date, 'dd/MM/yyyy hh:mm:ss') + '\n\n';
      text += 'Tus jugadas son:\n';
      let sum = 0;
      for (const play of bet.plays) {
        text += `Loteria: ${play.lotteryName} - JUGADA: *${showParsedNumbers(play.playNumbers)}* - MONTO: $${play.amount} - TIPO: ${play.playType}\n`;
        sum += play.amount;
      }
      text += `Total: $${sum}\n`;
      text += 'Gracias por elegirnos! 🙏🏼🙏🏼';
      text += 'Y buena suerte!! 🤞🏼🍀';
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    }
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  }

  cloneTicket = (ticket: BetDto) => {
    this.modalOpened = true;
    this.modalService.success({
      nzTitle: 'Clonar ticket',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.cloneTicketSubmit(ticket),
      nzOnCancel: () => {
        this.modalOpened = false;
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  cloneTicketSubmit = (ticket: BetDto) => {
    this.modalOpened = false;
    this.closeDrawer(this.drawerBets);
    this.closeDrawer(this.drawerBet);
    this.cleanAll();
    const plays: PlayInterface[] = [];
    ticket.plays.map(play => {
      // tslint:disable-next-line:no-shadowed-variable
      const lottery = this.lotterys.filter((lottery) => lottery._id.toString() === play.lotteryId.toString()).pop();
      if (lottery && lottery.status && lottery.leftTime > 0) {
        const bettingLimit = lottery.bettingLimits.find(bl => bl.playType === play.playType && bl.status === true);
        if (!bettingLimit || play.amount <= bettingLimit.betAmount) {
          plays.push({
            lotteryNickName: lottery.nickname,
            uuid: uuidv4(),
            playNumbers: play.playNumbers,
            lotteryId: play.lotteryId,
            playType: play.playType,
            amount: play.amount
          });
        }
      }
    });
    this.plays = plays;
  }

  printTicket = (ticket: BetDto) => {
    if (this.canSeeSn(ticket)){
      printTicket(ticket);
    }
  }

  canCancelTicket = (ticket: BetDto): boolean => {
    // @ts-ignore
    const diffMs = (new Date(ticket.date) - new Date());
    const diffMins = diffMs / 60000; // minutes
    const cancellationTime = this.banking.cancellationTime;
    if (cancellationTime === null || cancellationTime === undefined) {
      return true;
    }
    return (diffMins > -(cancellationTime));
  }

  canSeeSn(bet: BetDto): boolean {
    if (this.betStatusEnum.Pending !== bet.betStatus){
      return false;
    }
    // @ts-ignore
    const diffMs = new Date(bet.date) - new Date();
    const diffMins = diffMs / 60000; // minutes
    return diffMins > -10;
  }

  getPanelSize = (size) => {
    return Math.floor(size);
  }

  getSumBets(bets: PlayInterface[] | PlayDto[]): number {
    let sum = 0;
    // @ts-ignore
    bets.map(item => {
      sum += item.amount;
    });
    return sum;
  }

  private initDataSync(): Observable<any[]> {
    const resultsControllerGetAll = this.resultsService.resultsControllerGetAll();
    const bankingLotteryControllerGetAll = this.bankingLotteriesService.bankingLotteryControllerGetAll();
    const bankingsControllerGetBankingOfBanquer = this.bankingService.bankingsControllerGetBankingOfBanquer();
    return forkJoin([
      resultsControllerGetAll,
      bankingLotteryControllerGetAll,
      bankingsControllerGetBankingOfBanquer,
    ]);
  }

  private startReloadResults(): void {
    this.interval = setInterval(() => {
      this.reloadResults();
      this.reloadLotterys();
    }, 15000);
  }

  private reloadResults(): void {
    this.reloadingResults = true;
    this.resultsService.resultsControllerGetAll().subscribe(data => {
      this.lastResults = data;
      this.reloadingResults = false;
    }, error => {
      this.reloadingResults = false;
      throw new HttpErrorResponse(error);
    });
  }

  private reloadLotterys(): void {
    this.reloadingLotterys = true;
    this.bankingLotteriesService.bankingLotteryControllerGetAll().subscribe(data => {
      this.lotterys = data;
      this.reloadingLotterys = false;
    }, error => {
      this.reloadingLotterys = false;
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}


export interface PlayInterface {
  uuid: string;
  playType: Play.PlayTypeEnum;
  lotteryId: object;
  lotteryNickName: string;
  amount: number;
  playNumbers: PlayNumbers;
}
