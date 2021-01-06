import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  AuthCredentialsDto,
  BankingDto,
  BankingService, ConsortiumsService,
  CreateBankingDto, DeleteBankingDto, User
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
      key: 'name'
    },
    {
      title: 'Usuario',
      key: 'ownerUsername',
    },
    {
      title: 'Creacion',
      key: 'creationDate',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Inicio Operacion',
      key: 'startOfOperation',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitada' : 'Inhabilitada'
    }
  ];
  fetcher: Observable<BankingDto[]> = this.bankingService.bankingControllerFindAll();
  defaultForm = {
    name: null,
    status: false,
    selectedConsortium: null,
    showPercentage: false,
    username: null,
    password: null
  };
  formABM: FormGroup;
  fetcherCreate: (item) => Observable<any> = (item) => this.bankingService.bankingControllerCreate(item); // TODO REMOVE ANY
  fetcherUpdate: (item) => Observable<BankingDto> = (item) => this.bankingService.bankingControllerUpdate(item);
  fetcherDelete: (item) => Observable<BankingDto> = (item) => this.bankingService.bankingControllerRemove({bankingId: item._id, consortiumId:item.selectedConsortium}as DeleteBankingDto);
  parseData = (mode: string, valueForm, visibleData): CreateBankingDto | BankingDto => {
    console.log(`visible data = ${JSON.stringify(visibleData)}`)
    console.log(`value form = ${JSON.stringify(valueForm)}`)
    if (mode === 'C') {
      console.log('crating ')
      let newVar = {
        banking: {
          name: valueForm.name,
          status: valueForm.status,
          showPercentage: valueForm.showPercentage
        } as BankingDto,
        user: {username: valueForm.username, password: valueForm.password, role: RoleEnum.Banker} as AuthCredentialsDto,
        consortiumId: valueForm.selectedConsortium
      } as CreateBankingDto;
      console.log(newVar)
      return newVar;
    } else {
      let newVar1 = {
        ...valueForm
      } as BankingDto;
      console.log(newVar1)
      return newVar1;
    }
  }
  consortiums: any;
}
