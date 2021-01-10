import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {getCombinations, printTicket, reverseString, uuidv4} from '../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './bettingPanel.component.html',
  styleUrls: ['./bettingPanel.component.scss']
})
export class BettingPanelComponent implements OnInit {

  constructor(private modalService: NzModalService, private translateService: TranslateService,  private messageService: NzMessageService) {
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

  tickets = [
    {sn: '10366-9236980', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'pending', winner: false},
    {sn: '10366-9236981', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'canceled', winner: false},
    {sn: '10366-9236982', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 0, status: 'finished', winner: true},
    {sn: '10366-9236983', date: '2020-12-19T12:34:05.000Z', play: '50', premio: 100, status: 'finished', winner: false},
  ];

  panels = [
    {title: 'DIRECTO', types: [BetType.directo]},
    {title: 'PALE', types: [BetType.pale]},
    {title: 'TRIPLETA', types: [BetType.tripleta]},
    {title: 'SUPERPALE', types: [BetType.superPale]},
    // {title: 'PLAY 4', types: [BetType.pick4]},
    // {title: 'PLAY 4', types: [BetType.pick4]}
  ];

  lotterys = [
    {id: 1, color: '#2a549a80', name: 'NEW YORK PM', letters: 'NY-PM', leftTime: 234},
    {id: 2, color: '#0c7b5580', name: 'LPM', letters: 'LPM', leftTime: 2343},
    {id: 3, color: '#d8ff2880', name: 'LA-SUERTE', letters: 'LS', leftTime: 4545},
    {id: 4, color: '#ff1c1c80', name: 'NEW YORK AM', letters: 'NY-AM', closed: true}
  ];

  selectedLotterys: number[] = [1];

  lastResults = [
    {lottery: 'LPM', number: 1, numbers: [12, 22, 21]},
    {lottery: 'LA-SUERTE', number: 0, numbers: [19, 38, 21]}
  ];

  bets: Bet[] = [];
  lastClick = null;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ([this.drawerTickets, this.drawerCaja, this.drawerPagar, this.drawerHelp, this.drawerTicket].includes(true) || this.modalOpened){
      return;
    }

    if (event.key === '/') {
      this.switchLotterys('A');
    }

    if (event.key === 'l' || event.key === 'L') {
      this.cleanAll();
    }

    if (event.key === '*') {
      if (this.lastClick === '*'){
        this.onKeyPrint();
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
      this.onKeyPrint();
    }

    this.lastClick = event.key;
  }

  switchLotterys(type: string): void {
    if (type === 'A') {
      // SWITCH LOTTERYS
      const aux = [];
      // tslint:disable-next-line:prefer-for-of prefer-const
      const openLotterys = this.lotterys.filter(lottery => !lottery.closed);
      for (let i = 0; i < openLotterys.length; i++) {
        const lottery = openLotterys[i];
        if (this.selectedLotterys.includes(lottery.id)) {
          this.onChangeLottery(lottery, false);
          if (i < (openLotterys.length - 1)) {
            if (!aux.includes(openLotterys[i + 1].id)) {
              aux.push(openLotterys[i + 1].id);
            }
          } else {
            if (!aux.includes(openLotterys[0].id)) {
              aux.push(openLotterys[0].id);
            }
          }
        }
      }
      this.selectedLotterys = aux;
      if (this.selectedLotterys.length <= 0) {
        if (this.lotterys.length > 0) {
          this.selectedLotterys = [this.lotterys[0].id];
        }
      }
    } else if (type === 'B') {
      // SWITCH LOTTERYS
      this.lotterys.map(lottery => {
        if (!lottery.closed) {
          this.onChangeLottery(lottery, !this.selectedLotterys.includes(lottery.id));
        }
      });
    }
  }

  ngOnInit(): void {
  }

  onKeyEnter = () => {
    if (this.validateBet()) {
      for (const lottery of this.lotterys) {
        if (this.selectedLotterys.includes(lottery.id)) {
          this.createBet(lottery.letters);
        }
      }
      this.resetBet();
    }
  }

  onKeyPrint = () => {
    if (this.bets.length <= 0){
      return;
    }
    this.modalOpened = true;
    this.modalService.success({
      nzTitle: 'Confirmar e imprimir',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onSubmitPrint(),
      nzOnCancel: () => {
        this.modalOpened = false;
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onSubmitPrint = () => {
    this.modalOpened = false;
    printTicket({});
    this.cleanAll();
  }

  cleanAll = () => {
    this.number = null;
    this.amount = null;
    this.bets = [];
    this.selectedLotterys = [];
  }


  onKeyEnterNumber = () => {
    if (this.number != null && this.number.length > 0) {
      this.inputAmount.nativeElement.focus();
    }
  }


  createBet(lottery: string): void {
    // tslint:disable-next-line:radix
    const amount = parseFloat(String(this.amount));
    const playsToCreate: Bet[] = [];
    if (!this.number) {
      return;
    }
    let type: BetType = null;
    const numbers = this.number.toUpperCase();
    if (numbers.indexOf('.') !== -1) {
      // Contiene '.' Ex: 22235. 2323.
      const result = numbers.split('.')[0].match(/.{1,2}/g);
      if (result[result.length - 1].length === 1) {
        // Fixes last number
        result[result.length - 1] = '0' + result[result.length - 1];
      }
      if (result.length === 1) {
        // Solo un numero Ex: 23 32
        type = BetType.directo;
        playsToCreate.push({
          number: result[0],
          uuid: uuidv4(),
          type,
          lottery,
          amount
        });
        playsToCreate.push({
          number: reverseString(result[0]),
          uuid: uuidv4(),
          type,
          lottery,
          amount
        });
      }
      if (type === null && result.length > 0) {
        const combinations = getCombinations(result, 4, '-');
        for (const combination of combinations) {
          type = BetType.pale;
          playsToCreate.push({
            number: combination,
            uuid: uuidv4(),
            type,
            lottery,
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
        type = BetType.directo;
        if (to > 99) {
          to = 99;
        }
        // tslint:disable-next-line:radix
        for (let i = from; i <= to; i++) {
          let letter = String(i);
          if (letter.length === 1) {
            // Fixes last number
            letter = '0' + letter;
          }
          playsToCreate.push({
            number: letter,
            uuid: uuidv4(),
            type,
            lottery,
            amount
          });
        }
      }
    } else {
      // Solo numeros
      const result = numbers.match(/.{1,2}/g);
      if (result[result.length - 1].length === 1) {
        // Fixes last number
        result[result.length - 1] = '0' + result[result.length - 1];
      }

      switch (result.length) {
        case 1:
          type = BetType.directo;
          break;
        case 2:
          type = BetType.pale;
          break;
        case 3:
          type = BetType.tripleta;
          break;
      }
      playsToCreate.push({
        number: result.join('-'),
        uuid: uuidv4(),
        type,
        lottery,
        amount
      });
    }
    if (type === null) {
      this.messageService.create('error', 'Error de formato');
      return;
    }
    for (const play of playsToCreate) {
      this.newBet(play);
    }
  }

  newBet(bet: Bet): void {
    this.bets = this.bets.filter(item =>
      !(item.type === bet.type &&
        item.number === bet.number &&
        item.lottery === bet.lottery)
    );
    this.bets.push(bet);
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

  getFilteredBets(type: BetType[]): Bet[] {
    return this.bets.filter(bet => type.includes(bet.type));
  }

  onChangeLottery(lottery, $event): void {
    if ($event) {
      if (!this.selectedLotterys.includes(lottery.id)) {
        this.selectedLotterys.push(lottery.id);
      }
    } else {
      if (this.selectedLotterys.includes(lottery.id)) {
        this.selectedLotterys = this.selectedLotterys.filter(id => id !== lottery.id);
      }
    }

  }

  deleteBet(bet: Bet): void {
    this.bets = this.bets.filter(item => item.uuid !== bet.uuid);
  }

  openTicket = (ticket) => {
    this.selectedTicket = ticket;
    this.openDrawer('drawerTicket');
  }

  cloneTicket = (ticket) => {

  }

  printTicket = (ticket) => {
    printTicket(ticket)
  }

  payTicket = () => {
    if (!this.payTicketValue){
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
    const a = Math.floor(size);
    return a;
  }

  getSumBets(bets): number {
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

export interface Bet {
  uuid: string;
  lottery: string;
  number: string;
  amount: number;
  type: BetType;
}

export enum BetType {
  'directo',
  'pale',
  'tripleta',
  'superPale',
  'pick3',
  'pick4'
}
