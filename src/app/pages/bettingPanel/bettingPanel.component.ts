import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {getCombinations, reverseString, uuidv4} from '../../../utils/utilFunctions';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './bettingPanel.component.html',
  styleUrls: ['./bettingPanel.component.scss']
})
export class BettingPanelComponent implements OnInit {

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  @ViewChild('inputNumber', {static: false}) inputNumber: ElementRef;
  @ViewChild('inputAmount', {static: false}) inputAmount: ElementRef;

  now = new Date();
  number: string = null;
  amount: number = null;
  visibleTickets = false;

  panels = [
    {title: 'DIRECTO', types: [BetType.directo]},
    {title: 'PALE', types: [BetType.pale]},
    {title: 'TRIPLETA', types: [BetType.tripleta]},
    // {title: 'CASH 3', types: [BetType.pick3]},
    // {title: 'PLAY 4', types: [BetType.pick4]},
    // {title: 'PLAY 4', types: [BetType.pick4]}
  ];

  lotterys = [
    {id: 1, color: '#2a549a80', name: 'NEW YORK PM', letters: 'NY-PM', time: '01:28:51'},
    {id: 2, color: '#0c7b5580', name: 'LPM', letters: 'LPM', time: '01:28:51'},
    {id: 3, color: '#d8ff2880', name: 'LA-SUERTE', letters: 'LS', time: '01:28:51'},
    {id: 4, color: '#ff1c1c80', name: 'NEW YORK AM', letters: 'NY-AM', time: 'CLOSED', closed: true}
  ];

  selectedLotterys: number[] = [1];

  lastResults = [
    {lottery: 'LPM', number: 1, numbers: [12, 22, 21, 11, 48]},
    {lottery: 'LA-SUERTE', number: 0, numbers: [19, 38, 21]}
  ];

  bets: Bet[] = [];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    console.log('EVENT2', event);
    if (event.key === '/') {
      this.switchLotterys('B');
    }
    if (event.key === '*') {
      this.switchLotterys('A');
    }

    if (event.key === 'l' || event.key === 'L') {
      this.cleanAll();
    }
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

  openTickets = () => {
    this.visibleTickets = true;
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
      alert('Format error');
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

  onCancelTicket = () => {
    this.visibleTickets = !this.visibleTickets;
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
  'pick3',
  'pick4'
}
