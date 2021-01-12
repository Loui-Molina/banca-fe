export * from './banking.service';
import {BankingService} from './banking.service';

export * from './consortiums.service';
import {ConsortiumsService} from './consortiums.service';

export * from './dashboard.service';
import {DashboardService} from './dashboard.service';

export * from './default.service';
import {DefaultService} from './default.service';

export * from './lotteries.service';
import {LotteriesService} from './lotteries.service';

export * from './results.service';
import {ResultsService} from './results.service';

export * from './transactions.service';
import {TransactionsService} from './transactions.service';

export * from './users.service';
import {UsersService} from './users.service';

export const APIS = [AdminLotteriesService,
  BankingService,
  ConsortiumsService,
  DashboardService,
  DefaultService,
  ResultsService,
  TransactionsService,
  UsersService,
  AdminLotteriesService,
  BankingService,
  ConsortiumLotteriesService,
  ConsortiumsService,
  DashboardService,
  DefaultService,
  ResultsService,
  TransactionsService,
  UsersService];
