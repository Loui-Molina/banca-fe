import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import {Column, ExtraButton} from '../../../components/abm/abm.component';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AdminLotteriesService, AdminLotteryResDto} from 'local-packages/banca-api';
import DayEnum = AdminLotteryResDto.DayEnum;


@Component({
  selector: 'app-balance-admin',
  templateUrl: './admin-balance.component.html',
  styleUrls: ['./admin-balance.component.scss']
})
export class AdminBalanceComponent implements OnInit {

  columns: Column[] = [
    {
      title: 'LOTTERIES.LIST.NAME',
      key: 'name',
      hidden: false,
      showSearch: true,
    }/*, TODO
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
      valueFormatter: (data) => (data.status) ? this.ts('LOTTERIES.LIST.ENABLED') : this.ts('LOTTERIES.LIST.DISABLED'),
      showSearch: true,
      searchType: 'select',
      searchOptions: [
        {value: true, label: 'LOTTERIES.LIST.ENABLED'},
        {value: false, label: 'LOTTERIES.LIST.DISABLED'},
      ]
    },
    {
      title: 'LOTTERIES.LIST.COLOR',
      key: 'color',
      component: 'color'
    }*/
  ];
  fetcher: Observable<AdminLotteryResDto[]> = this.lotteriesService.adminLotteryControllerGetAll(); /* TODO */
  formABM: FormGroup;
  extraButtons: ExtraButton[] = [];
  defaultForm = {
    /*TODO*/
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
  getValidators = (mode: string) => {
    return {/* TODO
      closeTime: [Validators.required],
      openTime: [Validators.required],
      day: [Validators.required],
      name: [Validators.required],
      nickname: [Validators.required],
      playTime: [Validators.required],
      color: [Validators.required],
      status: [Validators.required]
    */
    };
  };

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
