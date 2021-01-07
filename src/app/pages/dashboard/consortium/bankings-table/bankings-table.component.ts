import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bankings-panel',
  templateUrl: './bankings-table.component.html',
  styleUrls: ['./bankings-table.component.scss']
})
export class BankingsTableComponent implements OnInit {
  columns: ColumnItem[] = [
    {name: 'BANCA'},
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
  bankingList: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getColumnTotal(field: string) {
    let initialValue = 0;
    return this.bankingList.reduce((accumulator, currentValue) => accumulator + currentValue[field], initialValue);
  }
}

interface ColumnItem {
  name: string;
}
