import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddResultDto, LotteryDto, Result, ResultDto, ResultsService} from '../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{

  constructor(private datePipe: DatePipe,
              private messageService: NzMessageService,
              private translateService: TranslateService,
              private modal: NzModalService,
              private resultsService: ResultsService,
              private lotteriesService: AdminLotteriesService,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }


  columns = [
    {
      title: 'Loteria',
      key: 'lotteryName'
    },
    {
      title: '1er',
      key: 'draw.first',
      valueFormatter: (data) => {
        return this.formatResult(data.draw.first);
      }
    },
    {
      title: '2do',
      key: 'draw.second',
      valueFormatter: (data) => {
        return this.formatResult(data.draw.second);
      }
    },
    {
      title: '3ro',
      key: 'draw.third',
      valueFormatter: (data) => {
        return this.formatResult(data.draw.third);
      }
    },
    {
      title: 'Fecha',
      key: 'date',
      valueFormatter: (data) => this.datePipe.transform(data.date, 'dd/MM/yyyy', '+0000')
    },
    {
      title: 'Fecha creacion',
      key: 'createdAt',
      valueFormatter: (data) => this.datePipe.transform(data.createdAt, 'dd/MM/yyyy hh:mm:ss')
    }
  ];
  fetcher: Observable<ResultDto[]> = this.resultsService.resultsControllerGetAll();
  defaultForm = {
    first: null,
    second: null,
    third: null,
    lottery: null,
    date: new Date()
  };
  loading = false;
  lotteries: Lottery[] = [];
  lotterySelected: Lottery;
  formABM: FormGroup;
  fetcherCreate: (item) => Observable<Result> = (item) => this.resultsService.resultsControllerCreate(item);

  parseData = (mode: string, valueForm): AddResultDto => {
    return {
      date: valueForm.date,
      first: valueForm.first,
      second: valueForm.second,
      third: valueForm.third,
      lotteryId: valueForm.lottery
    };
  }

  formatResult(value: number): string{
    return String(value).padStart(2, '0');
  }

  getValidators = (mode: string) => {
    return {
      first: [Validators.required, Validators.min(0), Validators.max(99)],
      second: [Validators.required, Validators.min(0), Validators.max(99)],
      third: [Validators.required, Validators.min(0), Validators.max(99)],
      lottery: [Validators.required],
      date: [Validators.required]
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.lotteriesService.adminLotteryControllerGetAll().subscribe(data => {
      this.lotteries = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  onChangeLottery($event): void{
    if ($event){
      this.lotterySelected = this.lotteries.filter(lottery => lottery._id === $event).pop();
    } else {
      this.lotterySelected = null;
    }
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
