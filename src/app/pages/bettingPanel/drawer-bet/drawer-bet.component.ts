import {Component, Input, OnInit} from '@angular/core';
import {printTicket, showParsedNumbers } from '../../../../utils/utilFunctions';
import {Banking, BetDto, BettingPanelService, PlayDto, PlayNumbers} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-drawer-bet',
  templateUrl: './drawer-bet.component.html',
  styleUrls: ['./drawer-bet.component.scss']
})

export class DrawerBetComponent implements OnInit {


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

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    const { bet } = params;
    this.bet = bet;
    this.nzVisible = true;
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.bet = null;
    this.nzVisible = false;
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  }

  printTicket = (ticket: BetDto) => {
    if (this.canSeeSn(ticket)){
      printTicket(ticket, this.banking);
    }
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

  getTotal(plays: Array<PlayDto>): number {
    return plays.reduce((acc, val) => acc += val.amount, 0);
  }
}
