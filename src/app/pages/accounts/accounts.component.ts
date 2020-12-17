import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {DefaultService} from '../../../../openApi/package';




@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private defaultService: DefaultService, private translateService: TranslateService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }
  columns: Column[] = [
    {key: 'name', title: 'SETTINGS.USERS.COLUMNS.NAME'},
    {key: 'username', title: 'SETTINGS.USERS.COLUMNS.USERNAME',
      type: 'numeric'},
    {key: 'password', title: 'SETTINGS.USERS.COLUMNS.PASSWORD'}
  ];
  formABM: FormGroup;
  defaultForm: User = {
    name: '',
    username: '',
    password: ''
  };
  fetcher: Observable<User[]> = this.defaultService.userControllerGetAll();
  fetcherSave: (item) => Observable<User> = (item) => this.defaultService.userControllerSave(item);
  fetcherDelete: (id: string) => Observable<Response> = (id) => this.defaultService.userControllerDelete(id);

  ngOnInit(): void {
  }
}
