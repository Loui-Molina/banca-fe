import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('size') size = 'medium';
  @Input('background') background: string;
  @Input('disabled') disabled: boolean;
  @Input('color') color = '#fff';

  constructor() {
  }

  ngOnInit(): void {
  }

}
