import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, ResponseDto, User, UsersService} from 'local-packages/banca-api';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns: Column[] = [
    {key: 'name', title: 'SETTINGS.USERS.COLUMNS.NAME'},
    {key: 'username', title: 'SETTINGS.USERS.COLUMNS.USERNAME', showSearch: true},
    {key: 'role', title: 'Rol'}
  ];
  formABM: FormGroup;
  roleEnum = User.RoleEnum;
  defaultForm = {
    name: null,
    username: null,
    password: null,
    role: null
  };
  fetcher: Observable<User[]> = this.usersService.usersControllerGetAll();

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private authService: AuthService,
              private translateService: TranslateService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  fetcherCreate: (item) => Observable<ResponseDto> = (item) => this.authService.authControllerSingUp(item);
  fetcherUpdate: (item) => Observable<User> = (item) => this.usersService.usersControllerUpdate(item);
  fetcherDelete: (item) => Observable<User> = (item) => this.usersService.usersControllerDelete(item._id);

  setValueForm(mode, defaultForm, item): any {
    return {
      name: item.name ? item.name : null,
      username: item.username ? item.username : null,
      password: null,
      role: item.role ? item.role : null
    };
  }

  getValidators(mode: string): any {
    return {
      name: [Validators.required],
      username: [Validators.required, Validators.minLength(4)],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ] : [Validators.minLength(8),
        Validators.maxLength(35)],
      role: [Validators.required]
    };
  }

  ngOnInit(): void {
  }
}
