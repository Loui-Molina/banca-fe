import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountingDto, AccountingService, BankingDto, User} from 'local-packages/banca-api';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent {

  userRole = User.RoleEnum;
  columns = [
    {
      title: 'Banca',
      key: 'banking',
      showSearch: true
    },
    {
      title: 'Consorcio',
      hide: this.userService.checkRoles([this.userRole.Consortium]),
      key: 'consortium',
      showSearch: true
    },
    {
      title: 'Semana',
      key: 'week',
      valueFormatter: (data) => this.datePipe.transform(data.week, 'dd/MM/yy'),
      showSearch: true,
      searchType: 'select'
    },
    {
      title: 'Balance',
      key: 'dueBalance',
    },
    {
      title: 'Pagado',
      key: 'isPayed',
      valueFormatter: (data) => (data.isPayed) ? 'si' : 'no',
      showSearch: true,
      searchType: 'select',
      searchOptions: [
        {label: 'si', value: true},
        {label: 'no', value: false}
      ]
    }
  ];
  defaultForm = {
    dueBalance: null,
    isPayed: null
  };
  formABM: FormGroup;
  fetcher: Observable<BankingDto[]> = null; // = this.accountingService.accountingControllerGetAll({});

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private accountingService: AccountingService,
              private userService: UserService) {

    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  fetcherUpdate: (item) => Observable<AccountingDto> = (item) => this.accountingService.accountingControllerUpdate(item);

  parseData = (mode: 'C' | 'U', valueForm, visibleObject): AccountingDto => {
    return {
      dueBalance: valueForm.dueBalance,
      isPayed: valueForm.isPayed,
      weekId: visibleObject.weekId,
      bankingId: visibleObject.bankingId,
    } as AccountingDto;
  };


  getValidators = (mode: string) => {
    return {
      dueBalance: [Validators.required],
      isPayed: [Validators.required]
    };
  };


  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
