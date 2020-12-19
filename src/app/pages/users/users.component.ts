import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {User, UsersService} from '../../../../local-packages/banca-api';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private translateService: TranslateService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }
  columns: Column[] = [
    {key: 'name', title: 'SETTINGS.USERS.COLUMNS.NAME'},
    {key: 'username', title: 'SETTINGS.USERS.COLUMNS.USERNAME',
      type: 'numeric'},
    {key: 'password', title: 'SETTINGS.USERS.COLUMNS.PASSWORD'}
  ];
  formABM: FormGroup;
  defaultForm = {
    name: '',
    username: '',
    password: ''
  };
  fetcher: Observable<User[]> = this.userService.userControllerGetAll();
  fetcherSave: (item) => Observable<User> = (item) => this.userService.userControllerSave(item);
  fetcherDelete: (id: string) => Observable<User> = (id) => this.userService.userControllerDelete(id);

  ngOnInit(): void {
  }
}
