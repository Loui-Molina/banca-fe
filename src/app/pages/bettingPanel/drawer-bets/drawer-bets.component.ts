import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {BetDto, BettingPanelService, UpdateBetDto} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import { printTicket } from 'src/utils/utilFunctions';

@Component({
  selector: 'app-drawer-bets',
  templateUrl: './drawer-bets.component.html',
  styleUrls: ['./drawer-bets.component.scss']
})

export class DrawerBetsComponent implements OnInit {


  @Input() nzTitle: string;
  // tslint:disable-next-line:ban-types
  @Input() canSeeSn: Function;
  // tslint:disable-next-line:ban-types
  @Input() getSendWhatsApp: Function;
  // tslint:disable-next-line:ban-types
  @Input() openTicket: Function;
  // tslint:disable-next-line:ban-types
  @Input() cloneTicket: Function;
  // tslint:disable-next-line:ban-types
  @Input() canCancelTicket: Function;


  nzVisible = false;
  reloadingTickets = false;
  bets: BetDto[] = [];
  betStatusEnum = BetDto.BetStatusEnum;


  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    this.nzVisible = true;
    this.reloadTickets();
  }

  close(): void{
    this.nzVisible = false;
  }

  private reloadTickets(): void {
    this.reloadingTickets = true;
    this.bettingPanelService.bettingPanelControllerGetAll().subscribe(data => {
      this.bets = data;
      this.reloadingTickets = false;
    }, error => {
      this.reloadingTickets = false;
      throw new HttpErrorResponse(error);
    });
  }

  cancelTicket = (ticket) => {
    if (!this.canCancelTicket(ticket)) {
      this.messageService.create('warning', `Este ticket ya no puede ser cancelado`, {nzDuration: 3000});
      return;
    }
    this.modalService.success({
      nzTitle: 'Cancelar ticket',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.cancelTicketSubmit(ticket),
      nzOnCancel: () => {
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  cancelTicketSubmit = (ticket) => {
    if (!this.canCancelTicket(ticket)) {
      this.messageService.create('warning', `Este ticket ya no puede ser cancelado`, {nzDuration: 3000});
      return;
    }
    const body: UpdateBetDto = {
      _id: ticket._id
    };
    this.bettingPanelService.bettingPanelControllerCancelBet(body).subscribe(value => {
      this.reloadTickets();
      this.messageService.create('success', `Ticket cancelado correctamente`, {nzDuration: 3000});
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  printTicket = (ticket: BetDto) => {
    if (this.canSeeSn(ticket)){
      printTicket(ticket);
    }
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
