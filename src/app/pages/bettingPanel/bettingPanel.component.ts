import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {formatResult, getCombinations, printTicket, reverseString, showParsedNumbers, uuidv4} from '../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  BankingLotteriesService,
  BankingLotteryDto,
  Bet,
  BetDto,
  BettingPanelService,
  CreateBetDto,
  Play,
  PlayNumbers,
  ResultDto,
  ResultsService
} from 'local-packages/banca-api';
import {forkJoin, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {UpdateBetDto} from 'local-packages/banca-api/model/models';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './bettingPanel.component.html',
  styleUrls: ['./bettingPanel.component.scss']
})
export class BettingPanelComponent implements OnInit, OnDestroy {

  @ViewChild('inputNumber', {static: false}) inputNumber: ElementRef;
  @ViewChild('inputAmount', {static: false}) inputAmount: ElementRef;
  now = new Date();
  number: string = null;
  amount: number = null;
  payTicketValue: number = null;
  selectedTicket: Bet;
  drawerTickets = false;
  drawerCaja = false;
  drawerPagar = false;
  drawerHelp = false;
  drawerTicket = false;
  modalOpened = false;
  modalConfirm = false;
  loadingSubmit = false;
  generatedBet: BetDto;
  bets: Bet[] = [];
  panels = [
    {title: 'DIRECTO', types: [Play.PlayTypeEnum.Direct]},
    {title: 'PALE', types: [Play.PlayTypeEnum.Pale]},
    {title: 'TRIPLETA', types: [Play.PlayTypeEnum.Tripleta]},
    {title: 'SUPERPALE', types: [Play.PlayTypeEnum.SuperPale]}
  ];
  lotterys: BankingLotteryDto[] = [];
  selectedLotterys: string[] = [];
  loading = false;
  superPale = false;
  reloadingResults = false;
  reloadingLotterys = false;
  reloadingTickets = false;
  lastResults: ResultDto[] = [];
  betStatusEnum = Bet.BetStatusEnum;
  plays: PlayInterface[] = [];
  lastClick = null;
  interval;
  columnsPlays = [
    {title: 'Loteria'},
    {title: 'Monto'},
    {title: 'Jugadas'},
  ];

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

  onKeyEnter = () => {
    if (!this.disabledBet()) {
      // TODO crear superpale
      for (const lottery of this.lotterys) {
        if (this.selectedLotterys.includes(lottery._id.toString())) {
          this.createBet(lottery);
        }
      }
      this.resetBet();
    }
  };

  onCheckSuperPale = () => {
    this.superPale = !this.superPale;
  };

  onSubmitBet = () => {
    if (this.plays.length <= 0) {
      return;
    }
    this.modalOpened = true;
    this.modalConfirm = true;
    this.generatedBet = null;
  };

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
  };

  cleanAll = () => {
    this.number = null;
    this.amount = null;
    this.plays = [];
    this.selectedLotterys = [];
  };

  onKeyEnterNumber = () => {
    if (this.number != null && this.number.length > 0) {
      this.inputAmount.nativeElement.focus();
    }
  };

  getLimit = () => {
    if (this.number === null || this.number === undefined) {
      return null;
    }
    let amount = parseFloat(String(this.amount));
    if (!amount) {
      amount = 0;
    }
    let playsToCreate: PlayInterface[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    for (const lottery of this.lotterys) {
      if (this.selectedLotterys.includes(lottery._id.toString())) {
        playsToCreate = playsToCreate.concat(this.getPlaysToCreate(lottery, amount));
      }
    }
    if (playsToCreate.length > 0) {
      let minor: number;
      for (const play of playsToCreate) {
        const lottery = this.lotterys.filter(lot => play.lotteryId.toString() === lot._id.toString()).pop();
        const bettingLimits = lottery.bettingLimits.filter(bl => bl.playType === play.playType && bl.status === true);
        if (lottery && bettingLimits.length > 0) {
          const bettingLimit = bettingLimits.pop();
          if (!minor || (minor > bettingLimit.betAmount)) {
            minor = bettingLimit.betAmount;
          }
        }
      }
      return minor;
    }
  };

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
      if (result) {
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

  createBet(lottery: BankingLotteryDto): void {
    if (!this.number) {
      return;
    }
    const amount = parseFloat(String(this.amount));
    if (!amount) {
      return;
    }
    let playsToCreate: PlayInterface[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    for (const lottery of this.lotterys) {
      if (this.selectedLotterys.includes(lottery._id.toString())) {
        playsToCreate = playsToCreate.concat(this.getPlaysToCreate(lottery, amount));
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

  openDrawer = (drawerName: string) => {
    if (drawerName === 'drawerTickets') {
      this.reloadTickets();
    }
    this[drawerName] = true;
  };

  closeDrawer = (drawerName: string) => {
    this[drawerName] = false;
  };

  disabledBet(): boolean {
    if (!this.number || !this.amount || this.amount === 0 || this.selectedLotterys.length === 0) {
      return true;
    }
    const limit = this.getLimit();
    const amount = parseFloat(String(this.amount));
    if (limit != null && amount > limit) {
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

  }

  deleteBet(play: PlayInterface): void {
    this.plays = this.plays.filter(item => item.uuid !== play.uuid);
  }

  openTicket = (ticket: Bet) => {
    this.selectedTicket = ticket;
    this.openDrawer('drawerTicket');
  };

  getSendWhatsApp = (bet: BetDto | Bet) => {
    // TODO Ver si tiene user y ponerle el numero como &phone=+5493543573840
    if (bet && bet._id) {
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
  };

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  };

  cloneTicket = (ticket: BetDto | Bet) => {
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
  };

  cloneTicketSubmit = (ticket: BetDto | Bet) => {
    this.modalOpened = false;
    this.closeDrawer('drawerTickets');
    this.closeDrawer('drawerTicket');
    this.cleanAll();
    const plays: PlayInterface[] = [];
    ticket.plays.map(play => {
      // tslint:disable-next-line:no-shadowed-variable
      const lottery = this.lotterys.filter((lottery) => lottery._id.toString() === play.lotteryId.toString()).pop();
      if (lottery && lottery.status && lottery.leftTime > 0) {
        plays.push({
          lotteryNickName: lottery.nickname,
          uuid: uuidv4(),
          playNumbers: play.playNumbers,
          lotteryId: play.lotteryId,
          playType: play.playType,
          amount: play.amount
        });
      }
    });
    this.plays = plays;
  };

  printTicket = (ticket: BetDto | Bet) => {
    printTicket(ticket);
  };

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
  };

  onSubmitPayTicket = () => {
    this.closeDrawer('drawerPagar');
  };

  canCancelTicket = (ticket: Bet): boolean => {
    // @ts-ignore
    const diffMs = (new Date(ticket.date) - new Date());
    const diffMins = diffMs / 60000; // minutes
    return (diffMins > -5);
  };

  cancelTicket = (ticket) => {
    if (!this.canCancelTicket(ticket)) {
      this.messageService.create('warning', `Este ticket ya no puede ser cancelado`, {nzDuration: 3000});
      return;
    }
    this.modalOpened = true;
    this.modalService.success({
      nzTitle: 'Cancelar ticket',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.cancelTicketSubmit(ticket),
      nzOnCancel: () => {
        this.modalOpened = false;
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  };

  cancelTicketSubmit = (ticket) => {
    if (!this.canCancelTicket(ticket)) {
      this.messageService.create('warning', `Este ticket ya no puede ser cancelado`, {nzDuration: 3000});
      this.modalOpened = false;
      return;
    }
    const body: UpdateBetDto = {
      _id: ticket._id
    };
    this.bettingPanelService.bettingPanelControllerCancelBet(body).subscribe(value => {
      this.reloadTickets();
      this.messageService.create('success', `Ticket cancelado correctamente`, {nzDuration: 3000});
    }, error => {
      throw new HttpErrorResponse(error);
    });
  };

  getPanelSize = (size) => {
    return Math.floor(size);
  };

  getSumBets(bets: PlayInterface[]): number {
    let sum = 0;
    bets.map(item => {
      sum += item.amount;
    });
    return sum;
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

  private reloadTickets(): void {
    this.reloadingTickets = true;
    this.bettingPanelService.bettingPanelControllerGetAll().subscribe(data => {
      this.bets = data;
      this.reloadingTickets = false;
    }, error => {
      this.reloadingTickets = false;
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
