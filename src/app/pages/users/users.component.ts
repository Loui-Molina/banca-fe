import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, ResponseDto, User, UsersService} from 'local-packages/banca-api';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ModalChangePasswordComponent} from '../../components/modals/modal-change-password/modal-change-password.component';
import {noSpaceRegex} from '../../../utils/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns: Column[] = [
    {key: 'name', title: 'USERS.LIST.NAME'},
    {key: 'username', title: 'USERS.LIST.USERNAME', showSearch: true},
    {key: 'role', title: 'USERS.LIST.ROL'}
  ];
  formABM: FormGroup;
  roleEnum = User.RoleEnum;
  defaultForm = {
    name: null,
    username: null,
    password: null,
    role: null
  };
  fetcher: Observable<User[]> = null; //  this.usersService.usersControllerGetAll();


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private authService: AuthService,
              private nzModalService: NzModalService,
              private translateService: TranslateService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  fetcherCreate: (item) => Observable<ResponseDto> = (item) => this.authService.authControllerSingUpLogged(item);
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
      username: [Validators.required, Validators.minLength(4), Validators.pattern(noSpaceRegex)],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern(noSpaceRegex)
      ] : [],
      role: [Validators.required]
    };
  }

  ngOnInit(): void {
  }


  changePassword(userId): void {
    this.nzModalService.create({
      nzTitle: this.ts('USERS.CREATE.CHANGE_PASSWORD'),
      nzContent: ModalChangePasswordComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        userId
      },
      nzFooter: null
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
