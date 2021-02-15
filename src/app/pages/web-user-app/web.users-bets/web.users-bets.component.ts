import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayInterface} from '../../bettingPanel/bettingPanel.component';
import {BankingLotteryDto, BetDto, BettingPanelService, Play, PlayNumbers} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {getCombinations, reverseString, showParsedNumbers, uuidv4} from '../../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-web.users-bets',
  templateUrl: './web.users-bets.component.html',
  styleUrls: ['./web.users-bets.component.scss']
})
export class WebUsersBetsComponent implements OnInit {
  loading = true;
  bets: BetDto[] = [];
  betStatusEnum = BetDto.BetStatusEnum;
  constructor(private route: ActivatedRoute,
              private bettingPanelService: BettingPanelService,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.bettingPanelService.bettingPanelControllerGetAll().subscribe(data => {
      this.bets = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  goBack(): void {
    this.router.navigate(['app/main']);
  }

  gotoBet(bet: BetDto): void {
    this.router.navigate(['app/bet/' + bet._id.toString()]);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
