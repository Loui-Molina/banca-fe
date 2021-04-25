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
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.CONSORTIUM',
      key: 'consortiumName',
      sum: false,
      titleFooter: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.FOOTER_TOTAL',
      width: '100px'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.BANKING',
      key: 'bankingName',
      sum: false,
      titleFooter: '',
      width: '100px'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.WEBUSER',
      key: 'name',
      sum: false,
      titleFooter: '',
      width: '100px'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.WINNER',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_WINNER',
      key: 'claimed',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.PENDING',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_PENDING',
      key: 'pending',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.LOSER',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_LOSER',
      key: 'loser',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOTAL',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_TOTAL',
      key: 'total',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.PROFITS',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_PROFITS',
      key: 'profits',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.PRIZES',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_PRIZES',
      key: 'prizes',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.PENDING_PRIZES',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_PENDING_PRIZES',
      key: 'pendingPrizes',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
    {
      title: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.BALANCE',
      tooltip: 'DASHBOARD.WEBUSERS_SUMMARY.LIST.TOOLTIP_BALANCE',
      key: 'balance',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
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
  red?: boolean;
}
