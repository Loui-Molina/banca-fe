import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-game-layout',
  templateUrl: './gamelayout.component.html',
  styleUrls: ['./gamelayout.component.scss']
})
export class GameLayoutComponent implements OnInit {

  constructor(private router: Router) {
  }
  isCollapsed = false;
  urlBg = 'assets/imgs/bettingfoot.jpg';



  ngOnInit(): void {
  }
}
