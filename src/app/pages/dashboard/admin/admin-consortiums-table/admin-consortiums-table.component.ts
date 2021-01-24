import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardConsortiumDto, DashboardService} from 'local-packages/banca-api';

@Component({
  selector: 'app-admin-consortiums-table',
  templateUrl: './admin-consortiums-table.component.html',
  styleUrls: ['./admin-consortiums-table.component.scss']
})
export class AdminConsortiumsTableComponent implements OnInit {
  columns: ColumnItem[] = [
    {name: 'CONSORCIO'},
    /*{name: 'W'},
    {name: 'P'},
    {name: 'L'},
    {name: 'C'},
    {name: 'TOTAL'},
    {name: 'VENTA'},
    {name: 'PREMIOS'},
    {name: '%'},
    {name: 'DESC'},
    {name: 'NETO'},*/
    {name: 'Balance'}];
  consortiums: DashboardConsortiumDto[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetConsortiumsStatistics().subscribe(res => {
      this.consortiums = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getColumnTotal(field: string): DashboardConsortiumDto[] {
    const initialValue = 0;
    return this.consortiums.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue[field]) ? currentValue[field] : 0, initialValue
    );
  }
}

interface ColumnItem {
  name: string;
}
