import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {
  BankingDto,
  BankingService,
  ConsortiumDto,
  ConsortiumsService,
  CreateTransactionDto, PaginationQueryDto,
  Transaction,
  TransactionsService
} from 'local-packages/banca-api';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';
import {Column} from '../../../components/abm/abm.component';
import OriginObjectEnum = Transaction.OriginObjectEnum;
import DestinationObjectEnum = Transaction.DestinationObjectEnum;
import {PageFetcher} from '../banking/banking-transactions.component';

@Component({
  selector: 'app-consortium-transactions',
  templateUrl: './consortium-transactions.component.html',
  styleUrls: ['./consortium-transactions.component.scss']
})
export class ConsortiumTransactionsComponent implements OnInit {
  constructor(private datePipe: DatePipe,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private modalService: NzModalService,
              private messageService: NzMessageService,
              private transactionsService: TransactionsService,
              private consortiumsService: ConsortiumsService,
              private bankingService: BankingService,
  ) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }
  columns: Column[] = [
    { title: 'TRANSACTIONS.LIST.DATE',
      key: 'createdAt',
      valueFormatter: (item, column) => this.valueFormatterDate(item, column),
      // showSearch: true,
      // searchType: 'date-range'
    },
    {
      title: 'TRANSACTIONS.LIST.ORIGIN',
      key: 'originName',
      // showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.DESTINATION',
      key: 'destinationName',
      //showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.DESCRIPTION',
      key: 'description',
      showSearch: true
    },
    {
      title: 'TRANSACTIONS.LIST.AMOUNT',
      type: 'numeric',
      key: 'amount',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.LAST_BALANCE',
      type: 'numeric',
      key: 'lastBalance',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.ACTUAL_BALANCE',
      type: 'numeric',
      key: 'actualBalance',
      valueFormatter: (item, column) => this.valueFormatter(item, column),
      component: 'amount',
    },
    {
      title: 'TRANSACTIONS.LIST.TYPE',
      key: 'type',
      valueFormatter: (item, column) => this.valueFormatterTipo(item, column),
      showSearch: true,
      searchType: 'select',
      searchOptions: [
        // {value: 'adjust', label: 'TRANSACTIONS.LIST.ADJUST'},
        {value: 'credit', label: 'TRANSACTIONS.LIST.CREDIT'},
        {value: 'debit', label: 'TRANSACTIONS.LIST.DEBIT'},
      ]
    }
  ];
  fetcher: PageFetcher<any, PaginationQueryDto> = (offset: number, limit: number, filters) => {
    const req: PaginationQueryDto = {
      offset,
      limit,
      filters
    };
    return this.transactionsService.transactionControllerGetAll(req);
  };
  formABM: FormGroup;
  defaultForm = {
    originObject: null,
    originId: null,
    destinationId: null,
    destinationObject: null,
    description: null,
    amount: null,
  };

  loading = false;
  consortiums: ConsortiumDto[] = [];
  bankings: BankingDto[] = [];
  originObjectEnum = OriginObjectEnum;
  destinationObjectEnum = DestinationObjectEnum;

  fetcherCreate: (item) => Observable<CreateTransactionDto> = (item) =>
    this.transactionsService.transactionControllerCreateTransactionConsortium(item);

  parseData = (mode: string, valueForm, visibleObject): CreateTransactionDto => {
    return {
      amount: valueForm.amount,
      originObject: valueForm.originObject,
      originId: valueForm.originId,
      destinationId: valueForm.destinationId,
      destinationObject: valueForm.destinationObject,
      description: valueForm.description,
    } as CreateTransactionDto;
  };

  setValueForm(mode, defaultForm, visibleObject): any {
    return {
      originObject: null,
      originId: null,
      destinationId: null,
      destinationObject: null,
      description: null,
      amount: null,
    };
  }

  getValidators = (mode: string) => {
    return {
      originObject: [Validators.required],
      originId: [Validators.required],
      destinationId: [Validators.required],
      destinationObject: [Validators.required],
      description: [Validators.required],
      amount: [Validators.required, Validators.min(1)],
    };
  };

  valueFormatter(data: Transaction, column): any {
    return '$' + data[column.key];
  }

  valueFormatterDate(data: Transaction, column): any {
    return this.datePipe.transform(data[column.key], 'dd/MM/yyyy hh:mm');
  }

  onChangeOrigen($event): void {
    if (this.formABM.value.originObject === this.originObjectEnum.Consortium) {
      this.formABM.controls.destinationId.setValue(null);
      this.formABM.controls.destinationObject.setValue(this.destinationObjectEnum.Banking);
    } else if (this.formABM.value.originObject === this.originObjectEnum.Banking) {
      this.formABM.controls.destinationId.setValue(null);
      this.formABM.controls.destinationObject.setValue(this.destinationObjectEnum.Consortium);
    }
    this.formABM.controls.originId.setValue(null);
  }

  onChangeOrigenId($event): void {
    if (this.formABM.value.originObject === this.originObjectEnum.Consortium) {
      this.formABM.controls.destinationId.setValue(null);
      this.formABM.controls.destinationObject.setValue(this.destinationObjectEnum.Banking);
    } else if (this.formABM.value.originObject === this.originObjectEnum.Banking) {
      this.formABM.controls.destinationId.setValue(null);
      this.formABM.controls.destinationObject.setValue(this.destinationObjectEnum.Consortium);
    } else {
      this.formABM.controls.destinationObject.setValue(null);
      this.formABM.controls.destinationId.setValue(null);
    }
  }

  getFilteredConsortiums(): ConsortiumDto[] {
    const banking = this.bankings.filter(banking => banking._id === this.formABM.value.originId).pop();
    if (!banking) {
      return [];
    }
    return this.consortiums.filter(consortium => consortium._id === banking.consortiumId);
  }

  getFilteredBankings(): BankingDto[] {
    const consortium = this.consortiums.filter(consortium => consortium._id === this.formABM.value.originId).pop();
    if (!consortium) {
      return [];
    }
    return this.bankings.filter(banking => banking.consortiumId === consortium._id);
  }


  onChangeDestination($event): void {
    this.formABM.controls.destinationId.setValue(null);
  }


  valueFormatterTipo(data: Transaction, column): any {
    switch (data.type){
      case 'adjust':
        return this.ts('TRANSACTIONS.LIST.ADJUST');
      case 'credit':
        return this.ts('TRANSACTIONS.LIST.CREDIT');
      case 'debit':
        return this.ts('TRANSACTIONS.LIST.DEBIT');
      default:
        return data[column.key];
    }
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.loading = true;
    this.initDataSync().subscribe(responseList => {
      this.consortiums = [responseList[0]];
      this.bankings = responseList[1];
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private initDataSync(): Observable<any[]> {
    // const transactionControllerGetAll = this.transactionsService.transactionControllerGetAll();
    const consortium = this.consortiumsService.consortiumControllerGetConsortiumOfUser();
    const bankingsControllerFindAll = this.bankingService.bankingsControllerFindAll();
    return forkJoin([
      consortium,
      bankingsControllerFindAll
    ]);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
