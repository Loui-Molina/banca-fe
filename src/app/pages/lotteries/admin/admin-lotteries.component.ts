import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import {ExtraButton} from '../../../components/abm/abm.component';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AdminLotteriesService, AdminLotteryResDto, ConsortiumLotteryDto} from "../../../../../local-packages/banca-api";
import DayEnum = AdminLotteryResDto.DayEnum;

// TODO check all's working
@Component({
  selector: 'app-lotteries-admin',
  templateUrl: './admin-lotteries.component.html',
  styleUrls: ['./admin-lotteries.component.scss']
})
export class AdminLotteriesComponent implements OnInit {

  constructor(private datePipe: DatePipe,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              private messageService: NzMessageService,
              private modal: NzModalService,
              private lotteriesService: AdminLotteriesService,
  ) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  columns = [
    {
      title: 'Nombre',
      key: 'name'
    },
    {
      title: 'Alias',
      key: 'nickname'
    },
    {
      title: 'Hora de juego',
      key: 'playTime'
    },
    {
      title: 'Apertura',
      key: 'openTime'
    },
    {
      title: 'Cierre',
      key: 'closeTime'
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitada' : 'Inhabilitada'
    }];
  fetcher: Observable<AdminLotteryResDto[]> = this.lotteriesService.adminLotteryControllerGetAll();
  formABM: FormGroup;
  extraButtons: ExtraButton[] = [];
  defaultForm = {
    closeTime: null,
    openTime: null,
    day: [],
    name: null,
    nickname: null,
    playTime: null,
    color: '#000',
    status: true
  };
  days = DayEnum;

  ngOnInit(): void {
    this.extraButtons = [
     // {
     //   icon: 'trophy',
     //   onClick: this.addNewResults,
     //   tooltip: 'Agregar resultado'
     // }
    ];
  }

  fetcherCreate: (item) => Observable<AdminLotteryResDto> = (item) => this.lotteriesService.adminLotteryControllerCreate(item);
  fetcherUpdate: (item) => Observable<AdminLotteryResDto> = (item) => this.lotteriesService.adminLotteryControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<any> = (id) => this.lotteriesService.adminLotteryControllerDelete(id);
  parseData = (mode: string, valueForm): AdminLotteryResDto => {
    return {
      name: valueForm.name,
      nickname: valueForm.nickname,
      color: valueForm.color,
      status: valueForm.status,
      playTime: this.datePipe.transform(new Date(valueForm.playTime), 'HH:mm'),
      results: [],
      day: valueForm.day,
      openTime: this.datePipe.transform(new Date(valueForm.openTime), 'HH:mm'),
      closeTime: this.datePipe.transform(new Date(valueForm.closeTime), 'HH:mm')
    };
  }
  getValidators = (mode: string) => {
    return {
      closeTime: [Validators.required],
      openTime: [Validators.required],
      day: [Validators.required],
      name: [Validators.required],
      nickname: [Validators.required],
      playTime: [Validators.required],
      color: [Validators.required],
      status: [Validators.required]
    };
  }
  setValueForm = (mode: string, defaultForm, item) => {
    return {
      closeTime: (item.closeTime) ? new Date(`1900-01-01T${item.closeTime}:00`) : null,
      openTime: (item.closeTime) ? new Date(`1900-01-01T${item.openTime}:00`) : null,
      day: item.day,
      name: item.name,
      nickname: item.nickname,
      playTime: (item.playTime) ? new Date(`1900-01-01T${item.playTime}:00`) : null,
      color: item.color,
      status: item.status
    };
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
