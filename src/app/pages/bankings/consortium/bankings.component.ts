import {Component} from '@angular/core';
import {addBankings, Banking, bankings} from '../../../../assets/data';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  AuthCredentialsDto,
  BankingDto,
  BankingService, ConsortiumsService,
  CreateBankingDto, User
} from "../../../../../local-packages/banca-api";
import RoleEnum = User.RoleEnum;
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-bankings',
  templateUrl: './bankings.component.html',
  styleUrls: ['./bankings.component.scss']
})
export class BankingsComponent {

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private bankingService: BankingService,
              private consortiumsService: ConsortiumsService) {
    this.formABM = this.formBuilder.group(this.defaultForm);

    this.consortiumsService.consortiumControllerGetAll().subscribe(consortiums => {
        this.consortiums = consortiums;
      }, error => {
        throw new HttpErrorResponse(error);
      }
    )
  }


  columns = [
    {
      title: 'Banca',
      key: 'bankings.name'
    },
    {
      title: 'Usuario',
      key: 'bankings.ownerUsername',
    },
    {
      title: 'Creacion',
      key: 'bankings.creationDate',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Inicio Operacion',
      key: 'bankings.startOfOperation',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Estado',
      key: 'bankings.status',
      valueFormatter: (data) => (data.status) ? 'Habilitada' : 'Inhabilitada'
    }
  ];
  fetcher: Observable<BankingDto[]> = this.bankingService.bankingControllerFindAll();
  defaultForm = {
    name: null,
    status: null,
    selectedConsortium: null,
    showPercentage: null,
    language: 'ES',
    username: null,
    password: null
  };
  formABM: FormGroup;
  fetcherCreate: (item) => Observable<any> = (item) => this.bankingService.bankingControllerCreate(item); // TODO REMOVE ANY
  fetcherUpdate: (item) => Observable<BankingDto> = (item) => this.bankingService.bankingControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<BankingDto> = (id) => this.bankingService.bankingControllerRemove(id);
  parseData = (mode: string, valueForm, visibleData): CreateBankingDto | BankingDto => {
    if (mode === 'C') {
      return {
        banking: {
          name: valueForm.name,
          language: valueForm.language,
          status: valueForm.status,
          showPercentage: valueForm.showPercentage
        } as BankingDto,
        user: {username: valueForm.username, password: valueForm.password, role: RoleEnum.Banker} as AuthCredentialsDto,
        consortiumId: valueForm.selectedConsortium
      } as CreateBankingDto;
    } else {
      return {
        // TODO CHECK QUE ONDA
        ...visibleData
      } as BankingDto;
    }
  }
  consortiums: any;
}
