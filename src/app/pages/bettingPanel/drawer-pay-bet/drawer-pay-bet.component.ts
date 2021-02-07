import {Component, Input, OnInit} from '@angular/core';
import {BetDto, BettingPanelService, ClaimBetDto} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-drawer-pay-bet',
  templateUrl: './drawer-pay-bet.component.html',
  styleUrls: ['./drawer-pay-bet.component.scss']
})

export class DrawerPayBetComponent implements OnInit {


  @Input() nzTitle: string;

  payTicketValue: string = null;
  nzVisible = false;
  payTicketFounded: BetDto;

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    this.nzVisible = true;
    this.payTicketFounded = null;
    this.payTicketValue = null;
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.nzVisible = false;
  }

  searchPayTicket = () => {
    this.payTicketFounded = null;
    if (!this.payTicketValue) {
      return;
    }
    const body: ClaimBetDto = {
      sn: this.payTicketValue
    };
    this.bettingPanelService.bettingPanelControllerGetClaimTicket(body).subscribe(data => {
      this.payTicketFounded = data;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  payTicket = () => {
    if (!this.payTicketValue) {
      return;
    }
    this.modalService.success({
      nzTitle: 'Pagar ticket',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onSubmitPayTicket(),
      nzOnCancel: () => {
      },
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onSubmitPayTicket = () => {
    const body: ClaimBetDto = {
      sn: this.payTicketValue
    };
    this.bettingPanelService.bettingPanelControllerClaimTicket(body).subscribe(value => {
      this.messageService.create('success', `Ticket pagado correctamente`, {nzDuration: 3000});
      this.payTicketValue = null;
      this.payTicketFounded = null;
      this.close();
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
