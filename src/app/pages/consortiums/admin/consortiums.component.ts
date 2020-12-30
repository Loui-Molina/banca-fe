import {Component, OnInit} from '@angular/core';
import {addBankings, Banking, bankings} from '../../../../assets/data';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consortium, ConsortiumsService, User, UsersService} from '../../../../../local-packages/banca-api';

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
    ownerUserId: null,
    status: true
    // phone: null,
    // email: null,
    // porcCuadreCaja: null,
    // language: 'ES',
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
      ownerUserId: [Validators.required],
      status: [Validators.required]
    };
  }
  ngOnInit(): void {
    this.usersService.userControllerGetAll().subscribe(res => {
      this.enumUsers = res;
    });
  }
}

/*
creationUserId
modificationUserId
ownerUserId
ownerName
_id
name
createdAt
*/
