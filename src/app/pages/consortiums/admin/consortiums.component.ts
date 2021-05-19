import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consortium, ConsortiumDto, ConsortiumsService, CreateConsortiumDto, User, UsersService} from 'local-packages/banca-api';
import {ModalChangePasswordComponent} from '../../../components/modals/modal-change-password/modal-change-password.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {noSpaceRegex} from '../../../../utils/constants';

@Component({
  selector: 'app-consortiums',
  templateUrl: './consortiums.component.html',
  styleUrls: ['./consortiums.component.scss']
})
export class ConsortiumsComponent implements OnInit {

  columns = [
    {
      title: 'CONSORTIUMS.LIST.CONSORTIUM',
      key: 'name'
    },
    {
      title: 'CONSORTIUMS.LIST.USER',
      key: 'ownerUsername',
    },
    {
      title: 'CONSORTIUMS.LIST.START_OF_OPERATION',
      key: 'startOfOperation',
      valueFormatter: (data) => this.datePipe.transform(data.startOfOperation, 'dd/MM/yyyy')
    },
    {
      title: 'CONSORTIUMS.LIST.STATUS',
      key: 'status',
      valueFormatter: (data) => (data.status) ? this.ts('CONSORTIUMS.LIST.ENABLED') : this.ts('CONSORTIUMS.LIST.DISABLED')
    }
  ];
  columnsBanking = [
    {
      title: 'CONSORTIUMS.VIEW.LIST.NAME',
      key: 'name',
    }
  ];
  defaultForm = {
    name: null,
    ownerName: null,
    ownerUsername: null,
    password: null,
    status: true
  };
  enumUsers: User[] = [];
  formABM: FormGroup;
  fetcher: Observable<ConsortiumDto[]> = this.consortiumsService.consortiumControllerGetAll();

  constructor(private datePipe: DatePipe,
              private usersService: UsersService,
              private nzModalService: NzModalService,
              private consortiumsService: ConsortiumsService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  fetcherCreate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerCreate(item);
  fetcherUpdate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerUpdate(item);
  fetcherDelete: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerDelete(item._id);

  getValidators(mode: string): any {
    return {
      name: [Validators.required],
      status: [Validators.required],
      ownerName: [Validators.required],
      ownerUsername: [Validators.required, Validators.minLength(4), Validators.pattern(noSpaceRegex)
      ],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern(noSpaceRegex)
      ] : []
    };
  }

  parseData(mode, valueForm, visibleObject): CreateConsortiumDto {
    return {
      user: {
        name: valueForm.ownerName,
        username: valueForm.ownerUsername,
        password: valueForm.password,
        _id: valueForm.ownerUserId,
      },
      name: valueForm.name,
      status: valueForm.status,
      ownerUserId: visibleObject?.ownerId
    };
  }

  ngOnInit(): void {
    this.usersService.usersControllerGetAll().subscribe(res => {
      this.enumUsers = res;
    });
  }

  changePassword(userId): void {
    this.nzModalService.create({
      nzTitle: this.ts('CONSORTIUMS.CREATE.CHANGE_PASSWORD'),
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
