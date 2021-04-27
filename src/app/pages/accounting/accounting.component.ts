import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountingService, BankingDto, User} from 'local-packages/banca-api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent {

  columns = [/*
    {
      title: 'BANKINGS.LIST.NAME',
      key: 'name'
    },
    {
      title: 'BANKINGS.LIST.USER',
      key: 'ownerUsername',
    },
    {
      title: 'BANKINGS.LIST.CREATION_DATE',
      key: 'creationDate',
      valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy hh:mm')
    },
    {
      title: 'BANKINGS.LIST.START_OF_OPERATION',
      key: 'startOfOperation',
      valueFormatter: (data) => this.datePipe.transform(data.startOfOperation, 'dd/MM/yyyy')
    },
    {
      title: 'BANKINGS.LIST.STATUS',
      key: 'status',
      valueFormatter: (data) => (data.status) ? this.ts('BANKINGS.LIST.ENABLED') : this.ts('BANKINGS.LIST.DISABLED')
    }
  */];
  defaultForm = {
    /*TODO*/
  };
  userRole = User.RoleEnum;
  formABM: FormGroup;
  fetcher: Observable<BankingDto[]> = this.accountingService.accountingControllerGetAll();

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private accountingService: AccountingService,) {

    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  // TODO
  // fetcherCreate: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerCreate(item);
  // fetcherUpdate: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerUpdate(item);
  // fetcherDelete: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerDelete(item._id);


  getValidators = (mode: string) => {
    return {
      /*TODO*/
    };
  };


  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

  createData(): void {
    this.accountingService.accountingControllerCreateTest().subscribe(value => {
      console.log('creada la data');
    }, error => {
      console.log('se rompio');
    });
  }
}
