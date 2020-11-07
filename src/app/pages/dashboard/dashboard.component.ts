import {Component, OnInit} from '@angular/core';
import {multi} from './data';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor() {
    Object.assign(this, {multi});
  }

  barChartData = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'Argentina',
      value: 3212121
    },
    {
      name: 'Bolivia',
      value: 123233
    },
    {
      name: 'Paraguay',
      value: 2343434
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ];

  single = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    },
    {
      name: 'UK',
      value: 6200000
    }
  ];

  data = [
    {
      title: '#0000233 Juan pablo',
      description: '+$1000',
      balance: '$995',
      count: '5',
      avatar: 'assets/imgs/person1.jpg'
    },
    {
      title: '#0000444 Juan pablo',
      description: '-$13',
      balance: '$13',
      count: '2',
      avatar: 'assets/imgs/person1.jpg'
    },
    {
      title: '#0000100 Pedro Alvear',
      description: '+$1100',
      balance: '$1100',
      count: '0',
      avatar: 'assets/imgs/person2.jpg'
    },
    {
      title: '#0000112 Susana Gimenez',
      description: '+$15555',
      balance: '$15555',
      count: '10',
      avatar: 'assets/imgs/person3.jpg'
    }
  ];

  dataEvents = [
    {
      title: '#0000233 Juan pablo',
      description: '+$1000',
      balance: '$995',
      count: '5',
      avatar: 'assets/imgs/person1.jpg'
    },
    {
      title: '#0000444 Juan pablo',
      description: '-$13',
      balance: '$13',
      count: '2',
      avatar: 'assets/imgs/person1.jpg'
    },
    {
      title: '#0000100 Pedro Alvear',
      description: '+$1100',
      balance: '$1100',
      count: '0',
      avatar: 'assets/imgs/person2.jpg'
    },
    {
      title: '#0000112 Susana Gimenez',
      description: '+$15555',
      balance: '$15555',
      count: '10',
      avatar: 'assets/imgs/person3.jpg'
    }
  ];

  multi: any[];

  // options

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

}
