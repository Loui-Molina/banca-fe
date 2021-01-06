import {Component, OnInit} from '@angular/core';
import {Consortium, consortiums} from '../../../../../assets/data';

@Component({
  selector: 'app-consortiums-panel',
  templateUrl: './consortiums-table.component.html',
  styleUrls: ['./consortiums-table.component.scss']
})
export class ConsortiumsTableComponent implements OnInit {
  columns: ColumnItem[] = [
    {name: 'CONSORCIO'},
    {name: 'W'},
    {name: 'P'},
    {name: 'L'},
    {name: 'C'},
    {name: 'TOTAL'},
    {name: 'VENTA'},
    {name: 'PREMIOS'},
    {name: '%'},
    {name: 'DESC'},
    {name: 'NETO'},
    {name: 'Balance'}];
  consortiumList: Consortium[] = consortiums;

  constructor() {
  }

  ngOnInit(): void {
  }

  getColumnTotal(field: string): Consortium[] {
    const initialValue = 0;
    return this.consortiumList.reduce((accumulator, currentValue) => accumulator + currentValue[field], initialValue);
  }
}

interface ColumnItem {
  name: string;
}
