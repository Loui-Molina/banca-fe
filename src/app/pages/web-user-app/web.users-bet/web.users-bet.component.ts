import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayInterface} from '../../bettingPanel/bettingPanel.component';
import {BetDto, BettingPanelService, PlayDto, PlayNumbers} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {showParsedNumbers} from '../../../../utils/utilFunctions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-web.users-bets',
  templateUrl: './web.users-bet.component.html',
  styleUrls: ['./web.users-bet.component.scss']
})
export class WebUsersBetComponent implements OnInit {
  loading = true;
  bet: BetDto;
  betId: string;
  betStatusEnum = BetDto.BetStatusEnum;
  constructor(private route: ActivatedRoute,
              private bettingPanelService: BettingPanelService,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
    this.route.params.subscribe(params => {
      this.betId = params.id;
    });
  }

  ngOnInit(): void {
    this.bettingPanelService.bettingPanelControllerGet(this.betId).subscribe(data => {
      this.bet = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  }

  getSumBets(bets: PlayInterface[] | PlayDto[]): number {
    let sum = 0;
    // @ts-ignore
    bets.map(item => {
      sum += item.amount;
    });
    return sum;
  }

  goBack(): void {
    this.router.navigate(['app/bets']);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
