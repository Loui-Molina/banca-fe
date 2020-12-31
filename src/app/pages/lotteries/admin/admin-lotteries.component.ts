import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {LotteriesService, Lottery, LotteryDto} from '../../../../../local-packages/banca-api';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lotteries-admin',
  templateUrl: './admin-lotteries.component.html',
  styleUrls: ['./admin-lotteries.component.scss']
})
export class AdminLotteriesComponent {

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private lotteriesService: LotteriesService) {
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
      title: 'Apertura',
      key: 'openTime'
    }, {
      title: 'Cierre',
      key: 'closeTime'
    },
    {
      title: 'Estado',
      key: 'status',
      valueFormatter: (data) => (data.status) ? 'Habilitado' : 'Inhabilitada'
    }];
  fetcher: Observable<Lottery[]> = this.lotteriesService.lotteryControllerGetAll();
  formABM: FormGroup;
  defaultForm = {
    closeTime: null,
    openTime: null,
    day: [],
    name: null,
    nickname: null,
    color: '#000',
    status: true
  };
  days = LotteryDto.DayEnum;
  fetcherCreate: (item) => Observable<Lottery> = (item) => this.lotteriesService.lotteryControllerCreate(item);
  fetcherUpdate: (item) => Observable<Lottery> = (item) => this.lotteriesService.lotteryControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<Lottery> = (id) => this.lotteriesService.lotteryControllerDelete(id);
  parseData = (mode: string, valueForm): LotteryDto => {
    return {
      name: valueForm.name,
      nickname: valueForm.nickname,
      color: valueForm.color,
      status: valueForm.status,
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
      color: item.color,
      status: item.status
    };
  }
}
