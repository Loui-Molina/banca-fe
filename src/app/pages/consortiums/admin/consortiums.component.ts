import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consortium, ConsortiumDto, ConsortiumsService, CreateConsortiumDto, User, UsersService} from 'local-packages/banca-api';

@Component({
  selector: 'app-consortiums',
  templateUrl: './consortiums.component.html',
  styleUrls: ['./consortiums.component.scss']
})
export class ConsortiumsComponent implements OnInit {

  columns = [
    {
      title: 'Consorcio',
      key: 'name'
    },
    {
      title: 'Usuario',
      key: 'ownerUsername',
    },
    {
      title: 'Inicio Operacion',
      key: 'startOfOperation',
      valueFormatter: (data) => this.datePipe.transform(data.startOfOperation, 'dd/MM/yyyy')
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitado' : 'Inhabilitada'
    }
  ];
  columnsBanking = [
    {
      title: 'Nombre',
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
              private consortiumsService: ConsortiumsService,
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
      ownerUsername: [Validators.required, Validators.minLength(4)],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ] : []
    };
  }

  parseData(mode, valueForm, visibleObject): CreateConsortiumDto {
    return {
      user: {
        name: valueForm.ownerName,
        username: valueForm.ownerUsername,
        password: valueForm.password
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

  print(visibleObject: any) {
    console.log(visibleObject);
  }
}
