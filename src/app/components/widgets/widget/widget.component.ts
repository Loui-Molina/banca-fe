import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input('title') title: string;
  @Input('backgroundColor') backgroundColor = '#2782d8';
  @Input('color') color = '#fff';
  @Input('icon') icon: string;
  @Input('value') value: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
