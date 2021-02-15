import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebUserLotteriesService, WebUserLotteryDto} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-web.users-main',
  templateUrl: './web.users-main.component.html',
  styleUrls: ['./web.users-main.component.scss']
})
export class WebUsersMainComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private webUserLotteriesService: WebUserLotteriesService) {
  }
  loading = true;
  lotteries: WebUserLotteryDto[] = [];
  ngOnInit(): void {
    this.webUserLotteriesService.webUserLotteryControllerGetAll().subscribe(data => {
      this.loading = false;
      this.lotteries = data;
    }, error => {
      this.loading = false;
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
