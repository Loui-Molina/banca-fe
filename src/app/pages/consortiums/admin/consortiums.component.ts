import {Component, OnInit} from '@angular/core';
import {addBankings, Banking, bankings} from '../../../../assets/data';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
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
      key: '',
      valueFormatter: () => 'X'
    },
    {
      title: 'Creacion',
      key: '',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Inicio Operacion',
      key: '',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Estado',
      key: '',
      valueGetter: () => 1,
      valueFormatter: () => 'Operando'
    }
  ];
  defaultForm = {
    name: null,
    ownerUserId: null
    // phone: null,
    // email: null,
    // status: null,
    // porcCuadreCaja: null,
    // language: 'ES',
    //
  };
  enumUsers: User[] = [];
  formABM: FormGroup;
  fetcher: Observable<Consortium[]> = this.consortiumsService.consortiumControllerGetAll();
  fetcherCreate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerCreate(item);
  fetcherUpdate: (item) => Observable<Consortium> = (item) => this.consortiumsService.consortiumControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<Consortium> = (id) => this.consortiumsService.consortiumControllerDelete(id);

  ngOnInit(): void {
    this.usersService.userControllerGetAll().subscribe(res => {
      this.enumUsers = res;
    });
  }
}
