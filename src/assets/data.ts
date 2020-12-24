export let multi = [
  {
    name: 'Germany',
    series: [
      {
        name: '1990',
        value: 62000000
      },
      {
        name: '2010',
        value: 73000000
      },
      {
        name: '2011',
        value: 89400000
      }
    ]
  },

  {
    name: 'USA',
    series: [
      {
        name: '1990',
        value: 250000000
      },
      {
        name: '2010',
        value: 309000000
      },
      {
        name: '2011',
        value: 311000000
      }
    ]
  },

  {
    name: 'France',
    series: [
      {
        name: '1990',
        value: 58000000
      },
      {
        name: '2010',
        value: 50000020
      },
      {
        name: '2011',
        value: 58000000
      }
    ]
  },
  {
    name: 'UK',
    series: [
      {
        name: '1990',
        value: 57000000
      },
      {
        name: '2010',
        value: 62000000
      }
    ]
  }
];


export let bankings: banking[] = [];
export let transactions: Transaction[] = [];

export let lotteries = [{
  name: 'Nueva York AM',
  nickname: 'NYAM',
  open: '08:00',
  close: '12:00',
}, {
  name: 'Nueva York PM',
  nickname: 'NYPM',
  open: '13:00',
  close: '20:00',
}];

// consortium  hardcoded values
export let consortium = {
  name: 'Un Consorcio', bankings: ['banca-0', 'banca-1', 'banca-2', 'banca-3'],
};


export function updateConsortium(newConsortium) {
  consortium = newConsortium;
}

export function addBankings(banking) {
  bankings.push(banking);
}

export function addTransaction(item: Transaction): void {
  transactions.unshift(item);
}

export function addLotteries(lottery) {
  lotteries.push(lottery);
}

export interface banking {
  name: string;
  winningTks: number;
  losingTks: number;
  pendingTks: number;
  canceledTks: number;
  totalTickets: number;
  earnings: number;
  prizes: number;
  percentage: number;
  discount: number;
  net: number;
  balance: number;
}

export interface Transaction {
  date: Date;
  amount: number;
  lastBalance: number;
  actualBalance: number;
  type?: TransactionType;
}

export enum TransactionType {
  // Deposito realizado por el Boludo, puede ser el pago de una apuesta o addicion al balance
  deposit = 'deposit',
  // Extraccion realizada por el boludo puede ser una extraccion de una cuenta o el pago de un premio
  extraction = 'extraction',
  // en caso de robo, imprevisto, etc
  adjust = 'adjust',
}
