import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService, Account} from '../../../rest/account.service';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';




@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: AccountService, private translateService: TranslateService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }
  columns: Column[] = [
    {key: 'name', title: 'SETTINGS.ACCOUNTS.COLUMNS.NAME'},
    {key: 'balance', title: 'SETTINGS.ACCOUNTS.COLUMNS.BALANCE',
      type: 'numeric'},
    {key: 'address', title: 'SETTINGS.ACCOUNTS.COLUMNS.ADDRESS',
      valueFormatter: (params, column) => this.capitalize(params, column)},
  ];
  formABM: FormGroup;
  defaultForm: Account = {
    name: '',
    address: ''
  };
  fetcher: Observable<Account[]> = this.userService.getAll();
  fetcherSave: (item) => Observable<Account> = (item) => this.userService.save(item);
  fetcherDelete: (id: string) => Observable<Response> = (id) => this.userService.delete(id);

  capitalize = (params: Account, column: Column) => {
    return params.address && params.address.toUpperCase();
  }

  ngOnInit(): void {
  }
}
