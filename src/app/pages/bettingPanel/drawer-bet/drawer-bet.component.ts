import {Component, Input, OnInit} from '@angular/core';
import {printTicket, showParsedNumbers} from '../../../../utils/utilFunctions';
import {Banking, BetDto, BettingPanelService, PlayDto, PlayNumbers} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-drawer-bet',
  templateUrl: './drawer-bet.component.html',
  styleUrls: ['./drawer-bet.component.scss']
})

export class DrawerBetComponent implements OnInit {

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private datePipe: DatePipe,
              private messageService: NzMessageService) {
  }


  @Input() nzTitle: string;
  // tslint:disable-next-line:ban-types
  @Input() canSeeSn: Function;
  // tslint:disable-next-line:ban-types
  @Input() getSendWhatsApp: Function;
  // tslint:disable-next-line:ban-types
  @Input() cloneTicket: Function;
  @Input() banking: Banking;


  nzVisible = false;
  bet: BetDto;
  betStatusEnum = BetDto.BetStatusEnum;
  columnsPlays = [
    {title: 'Loteria'},
    {title: 'Monto'},
    {title: 'Jugadas'},
    {title: 'Tipo'},
  ];
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  ngOnInit(): void {
  }

  open(params): void {
    const {bet} = params;
    this.bet = bet;
    this.nzVisible = true;
  }

  isVisible(): boolean {
    return this.nzVisible;
  }

  close(): void {
    this.bet = null;
    this.nzVisible = false;
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  };

  printTicket = (ticket: BetDto) => {
    if (this.canSeeSn(ticket)) {
      printTicket(ticket, this.banking);
    }
  };

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

  getTotal(plays: Array<PlayDto>): number {
    return plays.reduce((acc, val) => acc += val.amount, 0);
  }

  shareTicket = (bet: BetDto) => {
    const navigator = window.navigator as any;
    if (navigator.share && bet && bet._id && this.banking) {
      let text = this.banking.header + '\n\n';
      text += 'ID:  *' + bet._id.toString() + '*\n';
      text += 'SN:  *' + bet.sn + '*\n';
      text += 'Fecha: ' + this.datePipe.transform(bet.date, 'dd/MM/yyyy hh:mm a') + '\n\n';
      let sum = 0;
      let lastLottery: string;
      for (const play of bet.plays) {
        if (lastLottery !== play.lotteryName) {
          if (lastLottery) {
            text += '\n';
          }
          text += `--------------\n`;
          text += `${play.lotteryName.toUpperCase()}\n`;

        }
        // TODO traducir el tipo de jugada
        text += `*${showParsedNumbers(play.playNumbers)}*   -   $${play.amount}   -   ${play.playType}\n`;
        sum += play.amount;
        lastLottery = play.lotteryName;
      }
      text += `Total: $${sum}\n`;
      text += '\n' + this.banking.footer;
      navigator
        .share({
          title: 'TICKET ' + bet._id.toString(),
          text
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    } else {
      alert('share not supported');
    }
  };


  getPrinter(bet: BetDto): void {
    if (this.isMobile) {
      this.shareTicket(bet);
    } else {
      this.printTicket(bet);
    }

  }

}
