import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardBankingDto, DashboardConsortiumDto, DashboardService} from 'local-packages/banca-api';

@Component({
  selector: 'app-admin-consortiums-table',
  templateUrl: './admin-consortiums-table.component.html',
  styleUrls: ['./admin-consortiums-table.component.scss']
})
export class AdminConsortiumsTableComponent implements OnInit {
  columns: ColumnItem[] = [
    {title: 'Consorcio', key: 'name', sum: false, titleFooter: 'Total', width: '100px'},
    {title: 'W', tooltip: 'Winner', key: 'winner', sum: true, type: 'numeric'},
    {title: 'L', tooltip: 'Loser', key: 'loser', sum: true, type: 'numeric'},
    {title: 'P', tooltip: 'Pending', key: 'pending', sum: true, type: 'numeric'},
    {title: 'C', tooltip: 'Claimed', key: 'claimed', sum: true, type: 'numeric'},
    {title: 'E', tooltip: 'Expired', key: 'expired', sum: true, type: 'numeric'},
    {title: 'Ca', tooltip: 'Cancelled', key: 'cancelled', sum: true, type: 'numeric'},
    {title: 'T', tooltip: 'Total', key: 'total', sum: true, type: 'numeric'},
    {title: 'Profits', tooltip: 'Profits', key: 'profits', sum: true, prefix: '$', type: 'numeric'},
    {title: 'Prizes', tooltip: 'Prizes', key: 'prizes', sum: true, prefix: '$', type: 'numeric'},
    {title: 'P. Prizes', tooltip: 'Pending prizes', key: 'pendingPrizes', sum: true, prefix: '$', type: 'numeric'},
    {title: 'Balance', tooltip: 'Balance', key: 'balance', sum: true, prefix: '$', type: 'numeric'},
  ];
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

  getColumnTotal(field: string): number {
    // tslint:disable-next-line:only-arrow-functions
    return this.consortiums.reduce(function(acc, item): number {
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
