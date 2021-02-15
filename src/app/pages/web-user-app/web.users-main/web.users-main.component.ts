import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BankingLotteryDto, WebUserLotteriesService, WebUserLotteryDto} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-web.users-main',
  templateUrl: './web.users-main.component.html',
  styleUrls: ['./web.users-main.component.scss']
})
export class WebUsersMainComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router, private webUserLotteriesService: WebUserLotteriesService) {
  }
  loading = true;
  interval;
  lotteries: WebUserLotteryDto[] = [];
  ngOnInit(): void {
    this.reloadLotterys();
    this.interval = setInterval(() => {
      this.reloadLotterys();
    }, 30000);
  }

  private reloadLotterys(): void {
    this.webUserLotteriesService.webUserLotteryControllerGetAll().subscribe(data => {
      this.loading = false;
      this.lotteries = data;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }


  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onChangeCounter($event, lottery: BankingLotteryDto): void {
    if ($event.status === 3) {
      for (const lotteryItem of this.lotteries) {
        if (lotteryItem._id.toString() === lottery._id.toString()) {
          lotteryItem.status = false;
          lotteryItem.leftTime = 0;
        }
      }
      // this.messageService.create('warning', `La loteria ${lottery.name} ya no esta disponible`, {nzDuration: 3000});
    }
  }

  goToLottery(lottery): void {
    this.router.navigate(['app/lottery/' + lottery._id.toString()] );
  }

  gotoBets(): void {
    this.router.navigate(['app/bets']);
  }

  gotoTransactions(): void {
    this.router.navigate(['app/transactions']);
  }
}
