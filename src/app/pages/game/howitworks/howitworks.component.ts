import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-game-layout',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.scss']
})
export class HowitworksComponent implements OnInit {

  constructor(private router: Router) {
  }
  isCollapsed = false;
  urlBg = 'assets/imgs/bettingfoot.jpg';



  ngOnInit(): void {
  }
}
