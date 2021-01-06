import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('background') background: string;
  @Input('disabled') disabled: boolean;
  @Input('color') color = '#fff';
  constructor() { }

  ngOnInit(): void {
  }

}
