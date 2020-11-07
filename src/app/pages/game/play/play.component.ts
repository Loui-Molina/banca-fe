import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-game-dashboard',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) {
  }
  isCollapsed = false;
  urlBg = 'assets/imgs/bettingfoot.jpg';

  data = [
    {title: 'Loto Pool', events: 5, background: 'assets/imgs/lotopool.png'},
    {title: 'Juega Pega', events: 2, background: 'assets/imgs/juegapega.png'},
    {title: 'Pega 3 Mas', events: 3, background: 'assets/imgs/pega3mas.png'},
    {title: 'Super Kino TV', events: 2, background: 'assets/imgs/superkinotv.png'},
    {title: 'Loteria Nacional', events: 0, background: 'assets/imgs/loterianacional.png'},
    {title: 'Gana Mas', events: 2, background: 'assets/imgs/ganamas.png'},
    {title: 'American football', events: 5, background: 'assets/imgs/ameri.jpg', disabled: true},
    {title: 'Hockey', events: 0, background: 'assets/imgs/hockey.jpg', disabled: true},
    {title: 'Football', events: 2, background: 'assets/imgs/football.jpg', disabled: true}
  ];

  dataEvents = [
    {
      title: 'Loto Pool',
      description: '+$1000',
      balance: '$995',
      count: '5',
      avatar: 'assets/imgs/lotopool.png'
    },
    {
      title: 'Juega pega',
      description: '-$13',
      balance: '$13',
      count: '2',
      avatar: 'assets/imgs/juegapega.png'
    },
    {
      title: 'Super kino TV',
      description: '+$1100',
      balance: '$1100',
      count: '0',
      avatar: 'assets/imgs/superkinotv.png'
    },
    {
      title: 'Super Kino TV',
      description: '+$15555',
      balance: '$15555',
      count: '10',
      avatar: 'assets/imgs/superkinotv.png'
    }
  ];

  ngOnInit(): void {
  }
}
