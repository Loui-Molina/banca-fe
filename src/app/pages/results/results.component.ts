import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddResultDto, Result, ResultDto, ResultsService} from '../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private datePipe: DatePipe,
              private messageService: NzMessageService,
              private translateService: TranslateService,
              private modal: NzModalService,
              private resultsService: ResultsService,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);

  }

  columns = [
    {
      title: 'Loteria',
      key: 'lottery.name'
    },
    {
      title: '1er',
      key: 'draw.first',
    },
    {
      title: '2do',
      key: 'draw.second',
    },
    {
      title: '3ro',
      key: 'draw.third',
    },
    {
      title: 'Fecha',
      key: 'date',
      valueFormatter: (data) => this.datePipe.transform(data.date, 'dd/mm/yyyy hh:MM:ss')
    }
  ];
  fetcher: Observable<ResultDto[]> = this.resultsService.resultsControllerGetAll();
  defaultForm = {
    first: null,
    second: null,
    third: null,
    name: null,
    date: new Date()
  };
  formABM: FormGroup;
  fetcherCreate: (item) => Observable<Result> = (item) => this.resultsService.resultsControllerCreate(item);

  private get() {
    return undefined;
  }

  private saveResult(item) {
    return undefined;
  }

  addResult(): void {
    this.modal.warning({
      nzTitle: 'Agregar resultado',
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onAddResultSubmit(),
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  }

  onAddResultSubmit(): void {
    /*this.loadingAddResults = true;
    const body: DrawResultDto = {
      lotteryId: this.lotterySelected._id,
      first: this.number1,
      second: this.number2,
      third: this.number3
    };
    this.resultsService.resultsControllerAddResult(body).subscribe(value => {
        this.loadingAddResults = false;
        this.messageService.create('success', this.ts('Resultados agregados correctamente'));
        this.number1 = null;
        this.number2 = null;
        this.number3 = null;
        this.lotterySelected = null;
        this.closeDrawer('drawerResults');
      },
      error => {
        this.loading = false;
        throw new HttpErrorResponse(error);
      });*/
  }

  parseData = (mode: string, valueForm, visibleObject): AddResultDto => {
    return {
      date: valueForm.date,
      first: valueForm.first,
      second: valueForm.second,
      third: valueForm.third,
      lotteryId: visibleObject.lottery._id
    };
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
