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
    {title: 'W', tooltip: 'Winner', key: 'winner', sum: true},
    {title: 'L', tooltip: 'Loser', key: 'loser', sum: true},
    {title: 'P', tooltip: 'Pending', key: 'pending', sum: true},
    {title: 'C', tooltip: 'Claimed', key: 'claimed', sum: true},
    {title: 'E', tooltip: 'Expired', key: 'expired', sum: true},
    {title: 'Ca', tooltip: 'Cancelled', key: 'cancelled', sum: true},
    {title: 'T', tooltip: 'Total', key: 'total', sum: true},
    {title: 'Profits', tooltip: 'Profits', key: 'profits', sum: true, prefix: '$'},
    {title: 'Awards', tooltip: 'Awards', key: 'awards', sum: true, prefix: '$'},
    {title: 'P. Awards', tooltip: 'Pending awards', key: 'pendingAwards', sum: true, prefix: '$'},
    {title: 'Balance', tooltip: 'Balance', key: 'balance', sum: true, prefix: '$'},
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
  width?: string;
  titleFooter?: string;
  sum: boolean;
}
