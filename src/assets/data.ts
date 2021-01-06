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


export let bankings: Banking[] = [];
export let consortiums: Consortium[] = [];

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
  name: 'Un Consorcio', bankings: ['banca-1', 'banca-2', 'banca-3', 'banca-4'],
};


export function updateConsortium(newConsortium) {
  consortium = newConsortium;
}

export function addBankings(banking) {
  bankings.push(banking);
}

export function addConsortium(consortium) {
  consortiums.push(consortium);
}

export function addLotteries(lottery) {
  lotteries.push(lottery);
}

export interface Banking {
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
  phone?: number;
  email?: string;
  status?: boolean;
  language?: 'ES' | 'EN';
  user?: string;
}

export interface Consortium {
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
  phone?: number;
  email?: string;
  status?: boolean;
  language?: 'ES' | 'EN';
  user?: string;
}
