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
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.CONSORTIUM', key: 'name',
      sum: false,
      titleFooter: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.FOOTER_TOTAL',
      width: '100px'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.WINNER',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_WINNER',
      key: 'winner',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.LOSER',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_LOSER',
      key: 'loser',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.PENDING',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_PENDING',
      key: 'pending',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.CLAIMED',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_CLAIMED',
      key: 'claimed',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.EXPIRED',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_EXPIRED',
      key: 'expired',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.CANCELLED',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_CANCELLED',
      key: 'cancelled',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOTAL',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_TOTAL',
      key: 'total',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.PROFITS',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_PROFITS',
      key: 'profits',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.PRIZES',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_PRIZES',
      key: 'prizes',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.PENDING_PRIZES',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_PENDING_PRIZES',
      key: 'pendingPrizes',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.BALANCE',
      tooltip: 'DASHBOARD.CONSORTIUM_SUMMARY.LIST.TOOLTIP_BALANCE',
      key: 'balance',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
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
