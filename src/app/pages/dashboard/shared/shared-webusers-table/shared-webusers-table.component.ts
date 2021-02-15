import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardBankingDto, DashboardConsortiumDto, DashboardService, DashboardWebuserDto} from 'local-packages/banca-api';

@Component({
  selector: 'app-shared-webusers-table',
  templateUrl: './shared-webusers-table.component.html',
  styleUrls: ['./shared-webusers-table.component.scss']
})
export class SharedWebusersTableComponent implements OnInit {
  columns: ColumnItem[] = [
    {title: 'Consorcio', key: 'consortiumName', sum: false, titleFooter: 'Total', width: '100px'},
    {title: 'Banca', key: 'bankingName', sum: false, titleFooter: 'Total', width: '100px'},
    {title: 'Usuario web', key: 'name', sum: false, titleFooter: 'Total', width: '100px'},
    {title: 'L', tooltip: 'Loser', key: 'loser', sum: true, type: 'numeric'},
    {title: 'P', tooltip: 'Pending', key: 'pending', sum: true, type: 'numeric'},
    {title: 'W', tooltip: 'Winner', key: 'claimed', sum: true, type: 'numeric'},
    {title: 'T', tooltip: 'Total', key: 'total', sum: true, type: 'numeric'},
    {title: 'Profits', tooltip: 'Profits', key: 'profits', sum: true, prefix: '$', type: 'numeric'},
    {title: 'Prizes', tooltip: 'Prizes', key: 'prizes', sum: true, prefix: '$', type: 'numeric'},
    {title: 'P. Prizes', tooltip: 'Pending prizes', key: 'pendingPrizes', sum: true, prefix: '$', type: 'numeric'},
    {title: 'Balance', tooltip: 'Balance', key: 'balance', sum: true, prefix: '$', type: 'numeric'},
  ];
  webusers: DashboardWebuserDto[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetWebUsersStatistics().subscribe(res => {
      this.webusers = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getColumnTotal(field: string): number {
    // tslint:disable-next-line:only-arrow-functions
    return this.webusers.reduce(function(acc, item): number {
      return acc + (item[field] ? item[field] : 0);
    }, 0);
  }
}

interface ColumnItem {
  title: string;
  key: string;
  prefix?: string;
  tooltip?: string;
  type?: string;
  width?: string;
  titleFooter?: string;
  sum: boolean;
}
