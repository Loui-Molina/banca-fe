import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardBankingDto, DashboardConsortiumDto, DashboardService} from 'local-packages/banca-api';

@Component({
  selector: 'app-shared-bankings-table',
  templateUrl: './shared-bankings-table.component.html',
  styleUrls: ['./shared-bankings-table.component.scss']
})
export class SharedBankingsTableComponent implements OnInit {
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
  bankings: DashboardBankingDto[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetBankingsStatistics().subscribe(res => {
      this.bankings = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getColumnTotal(field: string): DashboardBankingDto | number {
    const value = this.bankings.reduce((a, b) => {
      return (
        a[field] + b[field]
      );
    });
    return value ? value : 0;
  }
}

interface ColumnItem {
  name: string;
}
