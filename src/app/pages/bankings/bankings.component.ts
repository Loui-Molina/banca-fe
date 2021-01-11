import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  AuthCredentialsDto,
  Banking,
  BankingDto,
  BankingService,
  ConsortiumsService,
  CreateBankingDto,
  UpdateBankingDto,
  User
} from '../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';

@Component({
  selector: 'app-bankings',
  templateUrl: './bankings.component.html',
  styleUrls: ['./bankings.component.scss']
})
export class BankingsComponent {

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private bankingService: BankingService,
              private userService: UserService,
              private consortiumsService: ConsortiumsService) {
    this.formABM = this.formBuilder.group(this.defaultForm);
    this.user = this.userService.getLoggedUser();
    if(this.user?.role === this.userRole.Admin){
      this.consortiumsService.consortiumControllerGetAll().subscribe(consortiums => {
          this.consortiums = consortiums;
        }, error => {
          throw new HttpErrorResponse(error);
        }
      );
    }
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
    name: null,
    status: true,
    selectedConsortium: null,
    showPercentage: true,
    username: null,
    password: null
  };
  user: UserInterface;
  userRole = User.RoleEnum;
  formABM: FormGroup;
  consortiums: any;
  fetcher: Observable<BankingDto[]> = this.bankingService.bankingControllerFindAll();
  fetcherCreate: (item) => Observable<Banking> = (item) => this.bankingService.bankingControllerCreate(item);
  fetcherUpdate: (item) => Observable<Banking> = (item) => this.bankingService.bankingControllerUpdate(item);
  fetcherDelete: (item) => Observable<Banking> = (item) => this.bankingService.bankingControllerDelete(item._id);
  setValueForm(mode, defaultForm, visibleObject): any{
    if (mode === 'C'){
      return {
        name: null,
        status:  true,
        selectedConsortium: null,
        showPercentage: true,
        username: null, // TODO falta que se envie el username desde el backend
        password: null
      };
    } else {
      return {
        name: visibleObject.name,
        status: visibleObject.status,
        selectedConsortium: visibleObject.consortiumId,
        showPercentage: visibleObject.showPercentage,
        username: null, // TODO falta que se envie el username desde el backend
        password: null
      };
    }
  }
  parseData = (mode: string, valueForm, visibleObject): CreateBankingDto | UpdateBankingDto => {
    if (mode === 'C') {
      return {
        banking: {
          name: valueForm.name,
          status: valueForm.status,
          showPercentage: valueForm.showPercentage
        } as BankingDto,
        user: {username: valueForm.username, password: valueForm.password} as AuthCredentialsDto,
        consortiumId: valueForm.selectedConsortium
      } as CreateBankingDto;
    } else {
      return {
        name: valueForm.name,
        status: valueForm.status,
        showPercentage: valueForm.showPercentage,
        selectedConsortium: valueForm.selectedConsortium
      } as UpdateBankingDto;
    }
  }
  getValidators(mode: string): any{
    return {
      name:[Validators.required],
      username: [Validators.required, Validators.minLength(4)],
      password: (mode === 'C') ? [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ] : []
    };
  }
}
