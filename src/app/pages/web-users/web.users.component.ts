import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  Banking,
  BankingDto,
  BankingService,
  ConsortiumsService,
  CreateBankingDto, CreateWebUserDto,
  SignUpCredentialsDto,
  UpdateBankingDto, UpdateWebUserDto,
  User, WebUser, WebUserDto, WebusersService
} from 'local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';
import {ModalChangePasswordComponent} from '../../components/modals/modal-change-password/modal-change-password.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ModalAddTransactionComponent} from '../../components/modals/modal-add-transaction/modal-add-transaction.component';

@Component({
  selector: 'app-web-users',
  templateUrl: './web.users.component.html',
  styleUrls: ['./web.users.component.scss']
})
export class WebUsersComponent {

  columns = [
    {
      title: 'Nombre',
      key: 'ownerName'
    },
    {
      title: 'Usuario',
      key: 'ownerUsername',
    },
    {
      title: 'Creacion',
      key: 'creationDate',
      valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy hh:mm:ss')
    },
    {
      title: 'Inicio de operacion',
      key: 'startOfOperation',
      valueFormatter: (data) => this.datePipe.transform(data.startOfOperation, 'dd/MM/yyyy')
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitada' : 'Inhabilitada'
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
    console.log({visibleObject});

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
      selectedBanking: [Validators.required],
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
      nzTitle: 'Cambiar Contraseña',
      nzContent: ModalChangePasswordComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        userId
      },
      nzFooter: null
    });
  }

  chargeBalance(bankingId, webUserId): void {
    this.nzModalService.create({
      nzTitle: 'Agregar balance',
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
}
