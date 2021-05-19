import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  Banking,
  BankingDto,
  BankingService,
  Consortium,
  ConsortiumsService,
  CreateBankingDto,
  SignUpCredentialsDto,
  UpdateBankingDto,
  User
} from 'local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';
import {ModalChangePasswordComponent} from '../../components/modals/modal-change-password/modal-change-password.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {noSpaceRegex} from '../../../utils/constants';

@Component({
  selector: 'app-bankings',
  templateUrl: './bankings.component.html',
  styleUrls: ['./bankings.component.scss']
})
export class BankingsComponent {

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private bankingService: BankingService,
              private translateService: TranslateService,
              private userService: UserService,
              private nzModalService: NzModalService,
              private consortiumsService: ConsortiumsService) {

    this.formABM = this.formBuilder.group(this.defaultForm);
    this.user = this.userService.getLoggedUser();
    if (this.user?.role === this.userRole.Admin) {
      this.consortiumsService.consortiumControllerGetAll().subscribe(consortiums => {
          this.consortiums = [];
          this.consortiums = consortiums;
        }, error => {
          throw new HttpErrorResponse(error);
        }
      );
    } else if (this.user?.role === this.userRole.Consortium) {
      this.consortiumsService.consortiumControllerGetConsortiumOfUser().subscribe(consortium => {
        console.log(consortium);
        this.consortiums = [];
        this.consortiums.push(consortium);
      });
    }
  }

  columns = [
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
  ];
  // FIXME cancellationTime not working on edit
  defaultForm = {
    name: null,
    status: true,
    selectedConsortium: null,
    showPercentage: false,
    earningPercentage: null,
    cancellationTime: null,
    header: null,
    footer: null,
    ownerName: null,
    username: null,
    password: null
  };
  user: UserInterface;
  userRole = User.RoleEnum;
  formABM: FormGroup;
  consortiums: Consortium[];
  fetcher: Observable<BankingDto[]> = this.bankingService.bankingsControllerFindAll();

  fetcherCreate: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerCreate(item);
  fetcherUpdate: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerUpdate(item);
  fetcherDelete: (item) => Observable<Banking> = (item) => this.bankingService.bankingsControllerDelete(item._id);

  setValueForm(mode, defaultForm, visibleObject): any {
    if (mode === 'C') {
      return {
        name: null,
        status: true,
        selectedConsortium: null,
        showPercentage: false,
        earningPercentage: null,
        cancellationTime: 5,
        header: null,
        footer: null,
        ownerName: null,
        username: null,
        password: null
      };
    } else {
      return {
        name: visibleObject.name,
        status: visibleObject.status,
        selectedConsortium: visibleObject.consortiumId,
        showPercentage: visibleObject.showPercentage,
        earningPercentage: visibleObject.earningPercentage,
        cancellationTime: visibleObject.cancellationTime ? visibleObject.cancellationTime : null,
        header: visibleObject.header,
        footer: visibleObject.footer,
        ownerName: visibleObject.ownerName,
        username: visibleObject.ownerUsername,
        password: null,
      };
    }
  }

  parseData = (mode: string, valueForm, visibleObject): CreateBankingDto | UpdateBankingDto => {
    if (mode === 'C') {
      return {
        banking: {
          name: valueForm.name,
          status: valueForm.status,
          showPercentage: valueForm.showPercentage,
          earningPercentage: valueForm.earningPercentage,
          cancellationTime: valueForm.cancellationTime,
          header: valueForm.header,
          footer: valueForm.footer
        } as BankingDto,
        user: {username: valueForm.username, password: valueForm.password, name: valueForm.ownerName} as SignUpCredentialsDto,
        consortiumId: valueForm.selectedConsortium
      } as CreateBankingDto;
    } else {
      return {
        _id: visibleObject._id,
        name: valueForm.name,
        status: valueForm.status,
        showPercentage: valueForm.showPercentage,
        cancellationTime: valueForm.cancellationTime,
        ownerUserId: visibleObject.ownerUserId,
        user: {username: valueForm.username, password: null, name: valueForm.ownerName} as SignUpCredentialsDto,
        selectedConsortium: valueForm.selectedConsortium,
        header: valueForm.header,
        footer: valueForm.footer
      } as UpdateBankingDto;
    }
  };

  getValidators = (mode: string) => {
    return {
      name: [Validators.required],
      status: [Validators.required],
      selectedConsortium: [Validators.required],
      header: [Validators.required],
      cancellationTime: [Validators.required],
      footer: [Validators.required],
      ownerName: [Validators.required],
      username: [Validators.required,
        Validators.pattern(noSpaceRegex)
      ],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern(noSpaceRegex)
      ] : []
    };
  };

  getConsortiumName(consortiumId: any): string {
    if (consortiumId) {
      return this.consortiums.find(consortium => consortium._id === consortiumId).name;
    }
    return '';
  }

  changePassword(userId): void {
    this.nzModalService.create({
      nzTitle: this.ts('BANKINGS.CREATE.CHANGE_PASSWORD'),
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
