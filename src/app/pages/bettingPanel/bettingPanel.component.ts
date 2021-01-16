import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {formatResult, getCombinations, printTicket, reverseString, showParsedNumbers, uuidv4} from '../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  BankingLotteriesService,
  BankingLotteryDto,
  ResultDto,
  ResultsService,
  Play,
  PlayNumbers, BettingPanelService, CreateBetDto, BetDto
} from '../../../../local-packages/banca-api';
import {forkJoin, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './bettingPanel.component.html',
  styleUrls: ['./bettingPanel.component.scss']
})
export class BettingPanelComponent implements OnInit, OnDestroy {

  constructor(private modalService: NzModalService,
              private resultsService: ResultsService,
              private bankingLotteriesService: BankingLotteriesService,
              private bettingPanelService: BettingPanelService,
              private datePipe: DatePipe,
              private translateService: TranslateService,
              private messageService: NzMessageService) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  @ViewChild('inputNumber', {static: false}) inputNumber: ElementRef;
  @ViewChild('inputAmount', {static: false}) inputAmount: ElementRef;


  now = new Date();
  number: string = null;
  amount: number = null;
  payTicketValue: number = null;
  selectedTicket = null;
  drawerTickets = false;
  drawerCaja = false;
  drawerPagar = false;
  drawerHelp = false;
  drawerTicket = false;
  modalOpened = false;
  modalConfirm = false;
  loadingSubmit = false;
  generatedBet: BetDto;

  tickets = [
    {sn: '10366-9236980', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'pending', winner: false},
    {sn: '10366-9236981', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'canceled', winner: false},
    {sn: '10366-9236982', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'finished', winner: true},
    {sn: '10366-9236983', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 100, status: 'finished', winner: false},
  ];

  panels = [
    {title: 'DIRECTO', types: [Play.PlayTypeEnum.Direct]},
    {title: 'PALE', types: [Play.PlayTypeEnum.Pale]},
    {title: 'TRIPLETA', types: [Play.PlayTypeEnum.Tripleta]},
    {title: 'SUPERPALE', types: [Play.PlayTypeEnum.SuperPale]},
    // {title: 'PLAY 4', types: [BetType.pick4]},
    // {title: 'PLAY 4', types: [BetType.pick4]}
  ];

  lotterys: BankingLotteryDto[] = [];

  selectedLotterys: string[] = [];
  loading = false;
  superPale = false;
  reloadingResults = false;
  reloadingLotterys = false;
  lastResults: ResultDto[] = [];

  plays: PlayInterface[] = [];
  lastClick = null;
  interval;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ([this.drawerTickets, this.drawerCaja, this.drawerPagar, this.drawerHelp, this.drawerTicket].includes(true) || this.modalOpened) {
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
      this.openDrawer('drawerTickets');
    }

    if (event.key === 'h' || event.key === 'H') {
      this.openDrawer('drawerHelp');
    }

    if (event.key === 'c' || event.key === 'C') {
      this.openDrawer('drawerCaja');
    }

    if (event.key === 'p' || event.key === 'P') {
      this.openDrawer('drawerPagar');
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

  private initDataSync(): Observable<any[]> {
    const resultsControllerGetAll = this.resultsService.resultsControllerGetAll();
    const bankingLotteryControllerGetAll = this.bankingLotteriesService.bankingLotteryControllerGetAll();
    return forkJoin([
      resultsControllerGetAll,
      bankingLotteryControllerGetAll
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

  onKeyEnter = () => {
    if (this.validateBet()) {
      // TODO crear superpale
      for (const lottery of this.lotterys) {
        if (this.selectedLotterys.includes(lottery._id.toString())) {
          this.createBet(lottery);
        }
      }
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
      this.loadingSubmit = false;
    }, error => {
      this.loadingSubmit = false;
      throw new HttpErrorResponse(error);
    });
  }

  cleanAll = () => {
    this.number = null;
    this.amount = null;
    this.plays = [];
    this.selectedLotterys = [];
  }


  onKeyEnterNumber = () => {
    if (this.number != null && this.number.length > 0) {
      this.inputAmount.nativeElement.focus();
    }
  }


  createBet(lottery: BankingLotteryDto): void {
    // tslint:disable-next-line:radix
    const amount = parseFloat(String(this.amount));
    const playsToCreate: PlayInterface[] = [];
    if (!this.number) {
      return;
    }
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
    if (type === null || playsToCreate.length === 0) {
      this.messageService.create('error', 'Error de formato');
      return;
    }
    for (const play of playsToCreate) {
      this.newBet(play);
    }
  }

  formatResult(value: number): string{
    return formatResult(value);
  }

  newBet(play: PlayInterface): void {
    const aux = [];
    this.plays.map(item => {
      if (
        item.lotteryId.toString() !== play.lotteryId.toString() ||
        item.playType !== play.playType
      ) {
        aux.push(item);
      } else {
        // TODO chekear si funca esta comparacion
        if (item.playNumbers === play.playNumbers){
          aux.push(play);
        } else {
          aux.push(item);
        }
      }
    });
    this.plays.push(play);
  }

  resetBet(): void {
    this.number = null;
    this.inputNumber.nativeElement.focus();
  }

  openDrawer = (drawerName: string) => {
    this[drawerName] = true;
  }

  closeDrawer = (drawerName: string) => {
    this[drawerName] = false;
  }

  validateBet(): boolean {
    if (this.number === null || this.amount === null || this.selectedLotterys.length === 0) {
      return false;
    }
    return this.amount > 0;
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

  }

  deleteBet(play: PlayInterface): void {
    this.plays = this.plays.filter(item => item.uuid !== play.uuid);
  }

  openTicket = (ticket) => {
    this.selectedTicket = ticket;
    this.openDrawer('drawerTicket');
  }


  getSendWhatsApp = (bet: BetDto) => {
    // TODO Ver si tiene user y ponerle el numero como &phone=+5493543573840
    if (bet && bet._id){
      let text = 'Hola! 👋🏼👋🏼 \n\n'; // TODO poner nombre de usuario
      text += 'Este es el detalle de tu ticket 🎟️:\n';
      text += '🆔:  *' + bet._id.toString() + '*\n';
      text += '🆔 SN:  *' + bet.sn + '*\n';
      text += '📅: ' + this.datePipe.transform(bet.date, 'dd/MM/yyyy hh:mm:ss') + '\n\n';
      text += 'Tus jugadas son:\n';
      let sum = 0;
      bet.plays.map(play => {
        // TODO mostrar nombre de loteria
        text += `Loteria: ${play.lotteryId.toString()} - JUGADA: *${showParsedNumbers(play.playNumbers)}* - MONTO: $${play.amount}\n`;
        sum += play.amount;
      });
      text += `Total: $${sum}\n`;
      text += 'Gracias por elegirnos! 🙏🏼🙏🏼';
      text += 'Y buena suerte!! 🤞🏼🍀';
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    }
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  }

  cloneTicket = (ticket) => {

  }

  printTicket = (ticket: BetDto) => {
    printTicket(ticket);
  }

  payTicket = () => {
    if (!this.payTicketValue) {
      return;
    }
    this.modalOpened = true;
    this.modalService.success({
      nzTitle: 'Pagar ticket',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onSubmitPayTicket(),
      nzOnCancel: () => {
        this.modalOpened = false;
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onSubmitPayTicket = () => {
    this.closeDrawer('drawerPagar');
  }

  cancelTicket = (ticket) => {

  }

  getPanelSize = (size) => {
    return Math.floor(size);
  }

  getSumBets(bets: PlayInterface[]): number {
    let sum = 0;
    bets.map(item => {
      sum += item.amount;
    });
    return sum;
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
