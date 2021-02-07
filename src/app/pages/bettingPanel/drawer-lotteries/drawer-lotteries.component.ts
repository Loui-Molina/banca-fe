import {Component, Input, OnInit} from '@angular/core';
import {BankingLotteriesService, BankingLotteryDto, BettingPanelService} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-drawer-lotteries',
  templateUrl: './drawer-lotteries.component.html',
  styleUrls: ['./drawer-lotteries.component.scss']
})

export class DrawerLotteriesComponent implements OnInit {


  @Input() nzTitle: string;
  @Input() availableBettingPlays: any;
  @Input() availablePlays: any;

  lotteries: BankingLotteryDto[] = [];
  lotteryId = null;
  selectedLotteryLimit: BankingLotteryDto;
  nzVisible = false;
  loading = false;

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private bankingLotteriesService: BankingLotteriesService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    this.nzVisible = true;
    this.loading = true;
    this.bankingLotteriesService.bankingLotteryControllerGetAll().subscribe(data => {
      this.lotteries = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.nzVisible = false;
  }

  getValueOfBettingPlay = (play, limits) => {
    const founded = limits.find(limit => limit.playType === play);
    if (founded) {
      return founded.betAmount;
    }
  }

  onChangeLotterySelected = ($event) => {
    this.selectedLotteryLimit = this.lotteries.find((lot) => lot._id.toString() === $event.toString());
  }

  getValueOfPlay = (play, limits) => {
    const founded = limits.find(limit => limit.playType === play);
    if (founded) {
      return founded.paymentAmount;
    }
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
