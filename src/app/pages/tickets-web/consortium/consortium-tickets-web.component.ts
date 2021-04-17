import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BetDto, PlayDto, PlayNumbers, TicketDto, TicketsService, User,} from 'local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {UserInterface, UserService} from '../../../services/user.service';
import {Observable} from 'rxjs';
import {showParsedNumbers} from 'src/utils/utilFunctions';
import {Column} from '../../../components/abm/abm.component';

@Component({
  selector: 'app-consortium-tickets-web',
  templateUrl: './consortium-tickets-web.component.html',
  styleUrls: ['./consortium-tickets-web.component.scss']
})
export class ConsortiumTicketsWebComponent implements OnInit, OnDestroy {
  user: UserInterface;
  userRole = User.RoleEnum;
  loading = false;
  columns: Column[] = [{
    title: 'TICKETS.LIST.BANKING',
    key: 'bankingName',
    showSearch: true
  }, {
    title: 'TICKETS.LIST.DATE',
    key: 'date',
    valueFormatter: (data) => this.datePipe.transform(data.date, 'dd/MM/yyyy hh:mm'),
    showSearch: true,
    searchType: 'date-range'
  }, {
    title: 'TICKETS.LIST.STATUS',
    key: 'betStatus',
    component: 'status',
    showSearch: true,
    searchType: 'select',
    searchOptions: [
      {label: 'TICKETS.LIST.STATUS_LIST.WINNER', value: BetDto.BetStatusEnum.Winner},
      {label: 'TICKETS.LIST.STATUS_LIST.PENDING', value: BetDto.BetStatusEnum.Pending},
      {label: 'TICKETS.LIST.STATUS_LIST.CANCELLED', value: BetDto.BetStatusEnum.Cancelled},
      {label: 'TICKETS.LIST.STATUS_LIST.LOOSER', value: BetDto.BetStatusEnum.Loser},
      {label: 'TICKETS.LIST.STATUS_LIST.CLAIMED', value: BetDto.BetStatusEnum.Claimed},
      {label: 'TICKETS.LIST.STATUS_LIST.EXPIRED', value: BetDto.BetStatusEnum.Expired}
    ]
  }];
  betStatus = BetDto.BetStatusEnum;
  fetcher: Observable<TicketDto[]> = this.ticketsService.ticketsControllerGetAll();
  columnsPlays = [
    {title: 'TICKETS.VIEW.LIST.LOTTERY'},
    {title: 'TICKETS.VIEW.LIST.AMOUNT'},
    {title: 'TICKETS.VIEW.LIST.PLAYS'},
    {title: 'TICKETS.VIEW.LIST.TYPE'},
  ];

  constructor(private datePipe: DatePipe,
              private messageService: NzMessageService,
              private translateService: TranslateService,
              private ticketsService: TicketsService,
              private modal: NzModalService,
              private userService: UserService) {
    this.user = this.userService.getLoggedUser();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  getTotal(plays: Array<PlayDto>): number {
    return plays.reduce((acc, val) => acc += val.amount, 0);
  }

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  };

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

}
