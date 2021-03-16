import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  BankingService,
  CreateWebUserDto,
  SignUpCredentialsDto,
  UpdateWebUserDto,
  User,
  WebUser,
  WebUserDto,
  WebusersService
} from 'local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';
import {ModalChangePasswordComponent} from '../../components/modals/modal-change-password/modal-change-password.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ModalAddTransactionComponent} from '../../components/modals/modal-add-transaction/modal-add-transaction.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-web-users',
  templateUrl: './web.users.component.html',
  styleUrls: ['./web.users.component.scss']
})
export class WebUsersComponent {

  columns = [
    {
      title: 'WEBUSERS.LIST.NAME',
      key: 'ownerName',
      showSearch: true
    },
    {
      title: 'WEBUSERS.LIST.USER',
      key: 'ownerUsername',
      showSearch: true
    },
    {
      title: 'WEBUSERS.LIST.CREATION_DATE',
      key: 'creationDate',
      valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy hh:mm')
    },
    {
      title: 'WEBUSERS.LIST.START_OF_OPERATION',
      key: 'startOfOperation',
      valueFormatter: (data) => this.datePipe.transform(data.startOfOperation, 'dd/MM/yyyy')
    },
    {
      title: 'WEBUSERS.LIST.STATUS',
      key: 'status',
      valueFormatter: (data) => (data.status) ? this.ts('WEBUSERS.LIST.ENABLED') : this.ts('WEBUSERS.LIST.DISABLED')
    }
  ];
  defaultForm = {
    status: true,
    selectedBanking: null,
    ownerName: null,
    username: null,
    password: null
  };
  user: UserInterface;
  userRole = User.RoleEnum;
  formABM: FormGroup;
  bankings: any;
  fetcher: Observable<WebUserDto[]> = this.webusersService.webUsersControllerFindAll();

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private webusersService: WebusersService,
              private translateService: TranslateService,
              private userService: UserService,
              private nzModalService: NzModalService,
              private bankingService: BankingService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
    this.user = this.userService.getLoggedUser();
    if ([this.userRole.Admin, this.userRole.Consortium].includes(this.user?.role)) {
      this.bankingService.bankingsControllerFindAll().subscribe(data => {
          this.bankings = data;
        }, error => {
          throw new HttpErrorResponse(error);
        }
      );
    }
  }

  fetcherCreate: (item) => Observable<WebUser> = (item) => this.webusersService.webUsersControllerCreate(item);
  fetcherUpdate: (item) => Observable<WebUser> = (item) => this.webusersService.webUsersControllerUpdate(item);
  fetcherDelete: (item) => Observable<WebUser> = (item) => this.webusersService.webUsersControllerDelete(item._id);

  setValueForm(mode, defaultForm, visibleObject): any {
    if (mode === 'C') {
      return {
        status: true,
        selectedBanking: null,
        ownerName: null,
        username: null,
        password: null
      };
    } else {
      return {
        status: visibleObject.status,
        selectedBanking: visibleObject.bankingId,
        ownerName: visibleObject.ownerName,
        username: visibleObject.ownerUsername,
        password: null,
      };
    }
  }


  parseData = (mode: string, valueForm, visibleObject): CreateWebUserDto | UpdateWebUserDto => {
    if (mode === 'C') {
      return {
        webUser: {
          status: valueForm.status,
          bankingId: valueForm.selectedBanking
        } as WebUserDto,
        user: {username: valueForm.username, password: valueForm.password, name: valueForm.ownerName} as SignUpCredentialsDto,
      } as CreateWebUserDto;
    } else {
      return {
        webUser: {
          _id: visibleObject._id,
          status: valueForm.status,
          bankingId: valueForm.selectedBanking
        } as WebUserDto,
        user: {
          _id: visibleObject.ownerUserId,
          username: valueForm.username,
          password: valueForm.password,
          name: valueForm.ownerName
        } as SignUpCredentialsDto,
      } as UpdateWebUserDto;
    }
  };

  getValidators = (mode: string) => {
    return {
      status: [Validators.required],
      selectedBanking: [this.userRole.Admin, this.userRole.Consortium].includes(this.user?.role) ? [Validators.required] : [],
      ownerName: [Validators.required],
      username: [Validators.required],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ] : []
    };
  };

  getBankingName(id): string {
    return this.bankings && this.bankings.find(banking => banking._id === id).name;
  }

  changePassword(userId): void {
    this.nzModalService.create({
      nzTitle: this.ts('WEBUSERS.CREATE.CHANGE_PASSWORD'),
      nzContent: ModalChangePasswordComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        userId
      },
      nzFooter: null
    });
  }

  editBalance(bankingId, webUserId): void {
    this.nzModalService.create({
      nzTitle: this.ts('WEBUSERS.CREATE.DEPOSIT_WITHDRAW_BALANCE'),
      nzContent: ModalAddTransactionComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        bankingId,
        webUserId,
      },
      nzFooter: null
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
