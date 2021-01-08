import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardBankingDto, DashboardService} from '../../../../../../local-packages/banca-api';

@Component({
  selector: 'app-admin-bankings-table',
  templateUrl: './admin-bankings-table.component.html',
  styleUrls: ['./admin-bankings-table.component.scss']
})
export class AdminBankingsTableComponent implements OnInit {
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

  getColumnTotal(field: string): DashboardBankingDto[] {
    const initialValue = 0;
    return this.bankings.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue[field]) ? currentValue[field] : 0, initialValue
    );
  }
}

interface ColumnItem {
  name: string;
}
