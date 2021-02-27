import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import {ExtraButton} from '../../../components/abm/abm.component';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AdminLotteriesService, AdminLotteryResDto} from 'local-packages/banca-api';
import DayEnum = AdminLotteryResDto.DayEnum;

// TODO check all's working
// TODO add color to table
@Component({
  selector: 'app-lotteries-admin',
  templateUrl: './admin-lotteries.component.html',
  styleUrls: ['./admin-lotteries.component.scss']
})
export class AdminLotteriesComponent implements OnInit {

  columns = [
    {
      title: 'LOTTERIES.LIST.NAME',
      key: 'name'
    },
    {
      title: 'LOTTERIES.LIST.ALIAS',
      key: 'nickname'
    },
    {
      title: 'LOTTERIES.LIST.PLAY_TIME',
      key: 'playTime',
      valueFormatter: (data) => this.datePipe.transform(data.playTime, 'HH:mm')
    },
    {
      title: 'LOTTERIES.LIST.OPEN_TIME',
      key: 'openTime',
      valueFormatter: (data) => this.datePipe.transform(data.openTime, 'HH:mm')
    },
    {
      title: 'LOTTERIES.LIST.CLOSE_TIME',
      key: 'closeTime',
      valueFormatter: (data) => this.datePipe.transform(data.closeTime, 'HH:mm')
    },
    {
      title: 'LOTTERIES.LIST.STATUS',
      key: 'status',
      valueFormatter: (data) => (data.status) ? this.ts('LOTTERIES.LIST.ENABLED') : this.ts('LOTTERIES.LIST.DISABLED')
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
    color: '#000000',
    status: true
  };
  days = DayEnum;

  constructor(private datePipe: DatePipe,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              private messageService: NzMessageService,
              private modal: NzModalService,
              private lotteriesService: AdminLotteriesService,
  ) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

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
  fetcherDelete: (item) => Observable<any> = (item) => this.lotteriesService.adminLotteryControllerDelete(item._id);
  parseData = (mode: string, valueForm): AdminLotteryResDto => {
    const {day, status, nickname, color, openTime, closeTime, name, playTime} = valueForm;
    if (openTime.getYear() !== 1970) {
      openTime.setFullYear(1970, 0, 1);
    }
    if (closeTime.getYear() !== 1970) {
      closeTime.setFullYear(1970, 0, 1);
    }
    if (playTime.getYear() !== 1970) {
      playTime.setFullYear(1970, 0, 1);
    }

    return {
      name,
      nickname,
      color,
      status,
      playTime,
      results: [],
      day,
      openTime,
      closeTime
    };
  };
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
  };
  setValueForm = (mode: string, defaultForm, item) => {
    return {
      closeTime: item?.closeTime,
      openTime: item?.openTime,
      day: item.day,
      name: item.name,
      nickname: item.nickname,
      playTime: item?.playTime,
      color: item.color,
      status: item.status
    };
  };

  getClosingDisabledMinutes = (hour: number): Array<number> => {
    if (this.formABM && this.formABM.value) {
      const playTime: Date = this.formABM.value.playTime;
      const openTime: Date = this.formABM.value.openTime;
      if (playTime && openTime) {
        const playHour: number = playTime.getHours();
        const openHour: number = openTime.getHours();
        const minutes: Array<number> = [];
        if (hour === playHour) {
          for (let i = playTime.getMinutes() + 1; i < 60; i++) {
            minutes.push(i);
          }
          return minutes;
        } else if (hour === openHour) {
          for (let i = 0; i < openTime.getMinutes(); i++) {
            minutes.push(i);
          }
          return minutes;
        }
      }
    }
    return [];
  };

  getClosingDisabledHours = (): Array<number> => {
    if (this.formABM && this.formABM.value) {
      const playTime: Date = this.formABM.value.playTime;
      const openTime: Date = this.formABM.value.openTime;
      if (playTime && openTime) {
        const hours: Array<number> = [];
        for (let i = 0; i < openTime.getHours(); i++) {
          hours.push(i);
        }
        for (let i = playTime.getHours() + 1; i < 24; i++) {
          hours.push(i);
        }
        return hours;
      }
    }
    return [];
  };

  getOpeningDisabledMinutes = (hour: number): Array<number> => {
    if (this.formABM && this.formABM.value) {
      const playTime: Date = this.formABM.value.playTime;
      if (playTime) {
        const playHour: number = playTime.getHours();
        const minutes: Array<number> = [];
        if (hour === playHour) {
          for (let i = playTime.getMinutes() + 1; i < 60; i++) {
            minutes.push(i);
          }
          return minutes;
        }
      }
    }
    return [];
  };

  getOpeningDisabledHours = (): Array<number> => {
    if (this.formABM && this.formABM.value) {
      const playTime: Date = this.formABM.value.playTime;
      if (playTime) {
        const hours: Array<number> = [];
        for (let i = playTime.getHours() + 1; i < 24; i++) {
          hours.push(i);
        }
        return hours;
      }
    }
    return [];
  };


  isOpeningTimeEnabled = (): boolean => {
    return !(this.formABM.value.playTime);
  };

  isClosingTimeEnabled = (): boolean => {
    return !(this.formABM.value.playTime && this.formABM.value.openTime);
  };

  resetOpenAndCloseTime = (): void => {
    if (this.formABM.touched) {
      this.formABM.controls.openTime.setValue(null);
      this.formABM.controls.closeTime.setValue(null);
    }
  };

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
