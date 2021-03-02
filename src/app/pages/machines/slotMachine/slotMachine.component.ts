import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

function shuffle(array): any[] {
  // tslint:disable-next-line:one-variable-per-declaration
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function compare(a, b): number {
  if (a.value < b.value) {
    return 1;
  }
  if (a.value > b.value) {
    return -1;
  }
  return 0;
}

function getRandomInt(min, max): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-404',
  templateUrl: './slotMachine.component.html',
  styleUrls: ['./slotMachine.component.scss'],
  animations: [
    trigger('cardSpinner', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      state('out', style({opacity: 1, transform: 'translateY(-100%)'})),
      transition('in => out', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('0.1s', style({transform: 'translateY(-100%)', opacity: 1}))
      ]),
      transition('out => in', [
        style({transform: 'translateY(100%)', opacity: 1}),
        animate('0.1s', style({transform: 'translateY(0)', opacity: 1}))
      ])
    ])
  ]
})
export class SlotMachineComponent implements OnInit {
  background = 'assets/imgs/slotMachine/background.jpg';
  machine = 'assets/imgs/slotMachine/machine.png';
  score = 100;
  MAXBET = 25;
  ANIMATIONS = true;
  showChart = true;
  BOXES = 3;
  WINNERMIN = 3;
  COUNTER = 0;
  lastWin: number;
  bet = 1;
  winner = false;
  autoSpin = false;
  RATES = [
    {value: 50, image: 'assets/imgs/slotMachine/bigwin.png'},
    {value: 10, image: 'assets/imgs/slotMachine/bar.png'},
    {value: 5, image: 'assets/imgs/slotMachine/7.png'},
    {value: 3, image: 'assets/imgs/slotMachine/cereza.png'},
    {value: 2, image: 'assets/imgs/slotMachine/banana.png'},
    {value: 1, image: 'assets/imgs/slotMachine/sandia.png'}];
  //  {value: 5, image: 'assets/imgs/slotMachine/limon.png'},
  //  {value: 3, image: 'assets/imgs/slotMachine/naranja.png'},
  //  {value: 2, image: 'assets/imgs/slotMachine/timbre.png'},
  //  {value: 1, image: 'assets/imgs/slotMachine/uva.png'}];
  multipleCards = [];
  result = {};
  status: string;

  series = [];

  lineChartData = [];

  ngOnInit(): void {
    const COLORS = [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688'];
    const multipleCards = [];
    for (let i = 0; i < this.BOXES; i++) {
      const cards = [];
      const shuffleBACKGROUNDS = shuffle(this.RATES);
      for (let j = 0; j < this.RATES.length; j++) {
        const selected = shuffleBACKGROUNDS[j];
        cards.push({value: selected.value, state: 'out', color: COLORS[j], background: selected.image});
      }
      multipleCards.push({id: i, currentIndex: 0, intervalInstance: null, cards});
    }
    this.multipleCards = multipleCards;
    this.checkChartData();
  }

  getRates = (): any[] => {
    return this.RATES.sort(compare);
  };

  play = (): void => {
    if (this.bet <= this.score) {
      this.COUNTER += 1;
      this.status = 'PLAYING';
      this.winner = false;
      this.result = {};
      this.changeScore(-this.bet);
      this.multipleCards.map(item => {
        this.animateSpin(item);
      });
    } else {
      this.autoSpin = false;
      this.status = 'FINISHED';
    }
  };

  changeBet = (value: number): void => {
    if (this.status !== 'PLAYING') {
      if (value > 0) {
        if (this.bet < this.MAXBET) {
          this.bet += value;
        }
      } else if (this.bet > 1) {
        this.bet += value;
      }
    }
  };

  animateSpin = async (item) => {
    const cards = item.cards;
    let currentIndex = item.currentIndex;
    let intervalInstance = item.intervalInstance;
    cards.forEach(card => card.state = 'out');
    currentIndex = 0;
    cards[currentIndex].state = 'in';

    intervalInstance = setInterval(() => {
      currentIndex++;
      if (currentIndex === cards.length) {
        currentIndex = 0;
      }
      if (currentIndex !== 0) {
        cards[currentIndex - 1].state = 'out';
      } else {
        cards[cards.length - 1].state = 'out';
      }
      cards[currentIndex].state = 'in';
    }, (this.ANIMATIONS) ? 100 : 100);

    //  const itemIndex = Math.floor((Math.random() * ((cards.length * 5) - cards.length)) + cards.length);
    let pool = [];
    // tslint:disable-next-line:prefer-for-of
    let maxValue = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].value > maxValue) {
        maxValue = cards[i].value;
      }
    }
    for (let i = 0; i < cards.length; i++) {
      // tslint:disable-next-line:radix
      const x = parseInt(String(maxValue / cards[i].value));
      const aux = [].constructor(x).fill(cards[i].value);
      pool = pool.concat(aux);
    }
    const valueSelected = pool[getRandomInt(0, pool.length)];
    let itemIndex = null;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].value === valueSelected) {
        itemIndex = i + (getRandomInt(1, 5) * (cards.length));
        break;
      }
    }
    setTimeout(() => {
      const randomCard = cards.filter(card => card.state === 'in');
      if (randomCard && randomCard.length > 0) {
        clearInterval(intervalInstance);
        this.result[item.id] = randomCard[0].value;
        this.checkFinish();
      }
    }, itemIndex * 100);
  };

  checkFinish = (): void => {
    if (Object.keys(this.result).length === this.multipleCards.length) {
      this.checkWinner();
    }
  };
  checkWinner = () => {
    const x = {};
    for (let i = 0; i < this.BOXES; i++) {
      if (x[this.result[i]] === null || x[this.result[i]] === undefined) {
        x[this.result[i]] = 1;
      } else {
        x[this.result[i]] += 1;
      }
    }
    let winner = false;
    let scoreToWin = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Object.keys(x).length; i++) {
      const key = Object.keys(x)[i];
      const value = x[key];
      if (value >= this.WINNERMIN) {
        winner = true;
        // tslint:disable-next-line:radix
        scoreToWin += parseInt(key) * value;
      }
    }
    if (winner && scoreToWin > 0) {
      this.isAWinner(scoreToWin);
    } else {
      this.playAgain(2000);
    }
  };

  isAWinner = (scoreToWin: number) => {
    const TIMES = 7;
    for (let i = 1; i < TIMES; i++) {
      setTimeout(() => {
        this.winner = !this.winner;
      }, (this.ANIMATIONS) ? 300 * i : 0);
    }
    const won = scoreToWin * this.bet;
    this.changeScore(won);
    this.lastWin = won;
    this.playAgain(3500);
  };

  playAgain = (timer) => {
    this.checkChartData();
    if (this.autoSpin) {
      setTimeout(() => {
        this.play();
      }, (this.ANIMATIONS) ? timer : 0);
    } else {
      this.status = 'FINISHED';
    }
  };

  changeScore = (SCORE: number) => {
    let x = 1;
    let loops = SCORE;
    if (SCORE < 0) {
      x = -1;
      loops *= -1;
    }
    for (let i = 0; i < loops; i++) {
      setTimeout(() => {
        this.score = this.score + x;
      }, (this.ANIMATIONS) ? ((1000 / loops) * i) : 0);
    }
  };

  checkChartData = () => {
    const aux = [...this.lineChartData];
    const serie = {
      name: this.COUNTER,
      value: this.score
    };
    let exists = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].name === this.bet) {
        exists = true;
        aux[i].series.push(serie);
        break;
      }
    }
    if (!exists) {
      aux.push({
        name: this.bet,
        series: [serie]
      });
    }
    this.lineChartData = aux;
  };

}
