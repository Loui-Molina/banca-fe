import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss']
})
export class DescriptionsComponent implements OnInit {
  @Input()
  title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
