import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardService} from '../../../../../local-packages/banca-api';

@Component({
  selector: 'app-web.users-main',
  templateUrl: './web.users-main.component.html',
  styleUrls: ['./web.users-main.component.scss']
})
export class WebUsersMainComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService) {
  }
  lotteries = [
    {name: 'Loteria 1', nickname: 'LOT 1', disabled: false, id: 1},
    {name: 'Loteria 2', nickname: 'LOT 2', disabled: false, id: 2},
    {name: 'Loteria 3', nickname: 'LOT 3', disabled: true, id: 3},
  ];
  balance = 0;
  ngOnInit(): void {

    this.dashboardService.dashboardControllerGetWebUserWidgetsStatistics().subscribe(res => {
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
  goToLottery(lottery): void {
    this.router.navigate(['app/lottery/' + lottery.id] );
  }

  gotoBets(): void {
    this.router.navigate(['app/bets']);
  }

  gotoTransactions(): void {
    this.router.navigate(['app/transactions']);
  }
}
