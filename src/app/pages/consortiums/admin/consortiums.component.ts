import {Component, OnInit} from '@angular/core';
import {addBankings, Banking, bankings} from '../../../../assets/data';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consortium, ConsortiumsService, CreateConsortiumDto, User, UsersService} from '../../../../../local-packages/banca-api';

@Component({
  selector: 'app-consortiums',
  templateUrl: './consortiums.component.html',
  styleUrls: ['./consortiums.component.scss']
})
export class ConsortiumsComponent implements OnInit {

  constructor(private datePipe: DatePipe,
              private usersService: UsersService,
              private consortiumsService: ConsortiumsService,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  columns = [
    {
      title: 'Consorcio',
      key: 'name'
    },
    {
      title: 'Usuario',
      key: 'ownerName',
    },
    {
      title: 'Creacion',
      key: 'createdAt',
      valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy')
    },
    {
      title: 'Inicio Operacion',
      key: 'firstTransactionDate',
      valueFormatter: (data) => this.datePipe.transform(data.firstTransactionDate, 'dd/MM/yyyy')
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitado' : 'Inhabilitada'
    }
  ];
  defaultForm = {
    name: null,
    username: null,
    password: null,
    status: true
  };
  enumUsers: User[] = [];
  formABM: FormGroup;
  fetcher: Observable<Consortium[]> = this.consortiumsService.consortiumControllerGetAll();
  fetcherCreate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerCreate(item);
  fetcherUpdate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<Consortium> = (id) => this.consortiumsService.consortiumControllerDelete(id);
  getValidators(mode: string): any{
    return {
      name: [Validators.required],
      status: [Validators.required],
      username: [Validators.required, Validators.minLength(4)],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ] : []
    };
  }
  parseData(mode, valueForm, visibleObject): CreateConsortiumDto{
    return {
      user: {
        username: valueForm.username,
        password: valueForm.password
      },
      name: valueForm.name,
      status: valueForm.status,
      ownerUserId: visibleObject?.ownerUserId,
      _id: visibleObject?.id
    };
  }
  ngOnInit(): void {
    this.usersService.userControllerGetAll().subscribe(res => {
      this.enumUsers = res;
    });
  }
}
