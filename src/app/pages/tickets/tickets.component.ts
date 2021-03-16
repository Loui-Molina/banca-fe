import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BetDto, PlayNumbers, ResultDto, ResultsService, TicketDto, TicketsService, User,} from 'local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {UserInterface, UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {showParsedNumbers} from 'src/utils/utilFunctions';
import {Column} from '../../components/abm/abm.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  user: UserInterface;
  userRole = User.RoleEnum;
  loading = false;
  columns: Column[] = [{
    title: 'BANCA',
    key: 'bankingName',
    showSearch: true
  }, {
    title: 'FECHA',
    key: 'date',
    valueFormatter: (data) => this.datePipe.transform(data.date, 'dd/MM/yyyy hh:mm'),
    showSearch: true,
    searchType: 'date'
  }, {
    title: 'STATUS',
    key: 'betStatus',
    component: 'status',
    showSearch: true
  }];
  betStatus = BetDto.BetStatusEnum;
  fetcher: Observable<TicketDto[]> = this.ticketsService.ticketsControllerGetAll();
  columnsPlays = [
    {title: 'Loteria'},
    {title: 'Monto'},
    {title: 'Jugadas'},
    {title: 'Tipo'},
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

  showParsedNumbers = (playNumbers: PlayNumbers) => {
    return showParsedNumbers(playNumbers);
  };

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

}
