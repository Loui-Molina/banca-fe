import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-divider',
  templateUrl: './title-divider.component.html',
  styleUrls: ['./title-divider.component.scss']
})
export class TitleDividerComponent implements OnInit {

  @Input('title') title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
