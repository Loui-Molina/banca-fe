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
    {title: 'Banca', key: 'name', sum: false, titleFooter: 'Total', width: '100px'},
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
  title: string;
  key: string;
  prefix?: string;
  tooltip?: string;
  width?: string;
  titleFooter?: string;
  sum: boolean;
}
