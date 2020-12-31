import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Lottery, LotteryDto, LotterysService, LotteryTimeDto} from '../../../../../local-packages/banca-api';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lotteries-admin',
  templateUrl: './admin-lotteries.component.html',
  styleUrls: ['./admin-lotteries.component.scss']
})
export class AdminLotteriesComponent {

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private lotterysService: LotterysService) {
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
      key: 'time.openTime'
    }, {
      title: 'Cierre',
      key: 'time.closeTime'
    },
    {
      title: 'Estado',
      key: '',
      valueFormatter: () => 'Operando'
    }];
  fetcher: Observable<Lottery[]> = this.lotterysService.lotteryControllerGetAll();
  formABM: FormGroup;
  defaultForm = {
    closeTime: null,
    openTime: null,
    days: [],
    name: null,
    nickname: null,
    color: '#000',
    status: true
  };
  days = LotteryTimeDto.DayEnum;
  fetcherCreate: (item) => Observable<Lottery> = (item) => this.lotterysService.lotteryControllerCreate(item);
  fetcherUpdate: (item) => Observable<Lottery> = (item) => this.lotterysService.lotteryControllerUpdate(item);
  fetcherDelete: (id: string) => Observable<Lottery> = (id) => this.lotterysService.lotteryControllerDelete(id);
  parseData = (mode: string, valueForm): LotteryDto => {
    return {
      name: valueForm.name,
      nickname: valueForm.nickname,
      color: valueForm.color,
      status: valueForm.status,
      time: {
        day: valueForm.days,
        openTime: this.datePipe.transform(new Date(valueForm.openTime), 'HH:mm'),
        closeTime: this.datePipe.transform(new Date(valueForm.closeTime), 'HH:mm')
      }
    };
  }
  getValidators = (mode: string) => {
    return {
      closeTime: [Validators.required],
      openTime: [Validators.required],
      days: [Validators.required],
      name: [Validators.required],
      nickname: [Validators.required],
      color: [Validators.required],
      status: [Validators.required]
    };
  }
}
