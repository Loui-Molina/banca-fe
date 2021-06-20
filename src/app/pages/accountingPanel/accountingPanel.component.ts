import {Component} from '@angular/core';
import {DashboardBankingDto, DashboardService} from '../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-accounting-panel',
  templateUrl: './accountingPanel.component.html',
  styleUrls: ['./accountingPanel.component.scss']
})
export class AccountingPanelComponent {

  columns: ColumnItem[] = [
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.BANKING',
      key: 'name',
      sum: false,
      titleFooter: 'DASHBOARD.BANKING_SUMMARY.LIST.FOOTER_TOTAL',
      width: '100px'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.WINNER',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_WINNER',
      key: 'winner',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.LOSER',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_LOSER',
      key: 'loser',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.PENDING',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_PENDING',
      key: 'pending',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.CLAIMED',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_CLAIMED',
      key: 'claimed',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.EXPIRED',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_EXPIRED',
      key: 'expired',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.CANCELLED',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_CANCELLED',
      key: 'cancelled',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.TOTAL',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_TOTAL',
      key: 'total',
      sum: true,
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.PROFITS',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_PROFITS',
      key: 'profits',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.PRIZES',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_PRIZES',
      key: 'prizes',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.PENDING_PRIZES',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_PENDING_PRIZES',
      key: 'pendingPrizes',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.BALANCE',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_BALANCE',
      key: 'balance',
      sum: true,
      prefix: '$',
      type: 'numeric'
    },
    {
      title: 'DASHBOARD.BANKING_SUMMARY.LIST.RED',
      tooltip: 'DASHBOARD.BANKING_SUMMARY.LIST.TOOLTIP_RED',
      key: 'red',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
    {
      title: 'Cuadre',
      tooltip: 'Cuadre',
      key: 'red',
      sum: true,
      prefix: '$',
      type: 'numeric',
      red: true
    },
  ];
  bankings: DashboardBankingDto[] = [];
  date: any;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetBankingsStatistics().subscribe(res => {
      this.bankings = res;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getColumnTotal(field: string): number {
    // tslint:disable-next-line:only-arrow-functions
    return this.bankings.reduce(function(acc, item): number {
      return acc + (item[field] ? item[field] : 0);
    }, 0);
  }

  onChange($event: any): void {
    console.log('date changed' + $event);
  }

  filter($event: MouseEvent): void {

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
