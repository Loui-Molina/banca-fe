import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-page-loader-bouncing',
  templateUrl: './page-loader-bouncing.component.html',
  styleUrls: ['./page-loader-bouncing.component.scss']
})
export class PageLoaderBouncingComponent implements OnInit {
  loader: boolean;
  key: number;
  @Input() set loading(loading: boolean) {
    const a = Math.random();
    this.key = a;
    setTimeout(() => {
      if (loading !== this.loader && this.key ===  a){
        this.loader = loading;
      }
    }, 200);
  }
  @Input('background') background = '#00000059';
  @Input('shadow') shadow;

  constructor() {
    this.numberA = Math.floor(Math.random() * 99);
    this.numberB = Math.floor(Math.random() * 99);
    this.numberC = Math.floor(Math.random() * 99);
  }
  numberA: number;
  numberB: number;
  numberC: number;

  ngOnInit(): void {
  }

}
