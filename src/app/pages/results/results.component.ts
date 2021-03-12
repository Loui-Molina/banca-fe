import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AddResultDto, AdminLotteriesService, AdminLotteryResDto, Result, ResultDto, ResultsService, User} from 'local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  columns = [];
  fetcher: Observable<ResultDto[]> = this.resultsService.resultsControllerGetAll();
  defaultForm = {
    first: null,
    second: null,
    third: null,
    lottery: null,
    date: new Date()
  };
  user: UserInterface;
  userRole = User.RoleEnum;
  loading = false;
  lotteries: AdminLotteryResDto[] = [];
  lotterySelected: AdminLotteryResDto;
  formABM: FormGroup;

  constructor(private datePipe: DatePipe,
              private messageService: NzMessageService,
              private translateService: TranslateService,
              private modal: NzModalService,
              private resultsService: ResultsService,
              private lotteriesService: AdminLotteriesService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);
    this.user = this.userService.getLoggedUser();
    const aux = [];
    if (this.user?.role === this.userRole.Admin) {
      aux.push({
        title: 'RESULTS.LIST.USER',
        key: 'creationUsername',
        showSearch: true
      });
    }
    this.columns = [
      ...aux,
      {
        title: 'RESULTS.LIST.LOTTERY',
        key: 'lotteryName',
        showSearch: true
      },
      {
        title: 'RESULTS.LIST.FIRST',
        key: 'draw.first',
        valueFormatter: (data) => {
          return this.formatResult(data.draw.first);
        }
      },
      {
        title: 'RESULTS.LIST.SECOND',
        key: 'draw.second',
        valueFormatter: (data) => {
          return this.formatResult(data.draw.second);
        }
      },
      {
        title: 'RESULTS.LIST.THIRD',
        key: 'draw.third',
        valueFormatter: (data) => {
          return this.formatResult(data.draw.third);
        }
      },
      {
        title: 'RESULTS.LIST.DATE',
        key: 'date',
        valueFormatter: (data) => this.datePipe.transform(data.date, 'dd/MM/yyyy'),
        showSearch: true
      },
      {
        title: 'RESULTS.LIST.CREATION_DATE',
        key: 'createdAt',
        valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy hh:mm a'),
        showSearch: true
      }
    ];
  }

  fetcherCreate: (item) => Observable<Result> = (item) => this.resultsService.resultsControllerCreate(item);

  parseData = (mode: string, valueForm): AddResultDto => {
    return {
      date: valueForm.date,
      first: valueForm.first,
      second: valueForm.second,
      third: valueForm.third,
      lotteryId: valueForm.lottery
    };
  };

  formatResult(value: number): string {
    return String(value).padStart(2, '0');
  }

  getValidators = (mode: string) => {
    return {
      first: [
        Validators.required,
        Validators.min(0), Validators.max(99),
        this.resultsValidator(this.formABM)
      ],
      second: [
        Validators.required,
        Validators.min(0), Validators.max(99),
        this.resultsValidator(this.formABM)
      ],
      third: [
        Validators.required,
        Validators.min(0), Validators.max(99),
        this.resultsValidator(this.formABM)
      ],
      lottery: [Validators.required],
      date: [Validators.required]
    };
  };

  ngOnInit(): void {
    if (this.user?.role === this.userRole.Admin) {
      this.loading = true;
      this.lotteriesService.adminLotteryControllerGetAll().subscribe(data => {
        this.lotteries = data;
        this.loading = false;
      }, error => {
        this.loading = false;
        throw new HttpErrorResponse(error);
      });
    }
  }

  onChangeLottery($event): void {
    if ($event) {
      this.lotterySelected = this.lotteries.filter(lottery => lottery._id === $event).pop();
    } else {
      this.lotterySelected = null;
    }
  }

  resultsValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const lista = [form.value.first, form.value.second, form.value.third];
      if (!(lista.includes(control.value))) {
        return null;
      }
      return {forbiddenName: {value: control.value}};
    };
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

}
