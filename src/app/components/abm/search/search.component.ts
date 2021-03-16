import {Component, Input, OnInit} from '@angular/core';
import {Column} from '../abm.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() visibleFilter: any;
  @Input() filterValue: any;
  // tslint:disable-next-line:ban-types
  @Input() search: Function;
  // tslint:disable-next-line:ban-types
  @Input() reset: Function;
  @Input() column: Column;
  constructor() { }

  ngOnInit(): void {
  }

  isActive(): boolean {
    return this.filterValue[this.column.key];
  }
}
