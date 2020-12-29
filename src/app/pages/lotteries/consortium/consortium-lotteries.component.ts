import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Banking, bankings, lotteries} from "../../../../assets/data";

@Component({
  selector: 'app-lotteries-consortium',
  templateUrl: './consortium-lotteries.component.html',
  styleUrls: ['./consortium-lotteries.component.scss']
})
export class ConsortiumLotteriesComponent {

  constructor(private formBuilder: FormBuilder) {
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
      key: 'open'
    }, {
      title: 'Cierre',
      key: 'close'
    },
    {
      title: 'Estado',
      key: '',
      valueFormatter: () => 'Operando'
    }];
  fetcher: Observable<any[]> = this.getData();
  fetcherCreate: (item) => Observable<any> = (item) => this.saveLottery(item);
  fetcherUpdate: (item) => Observable<any> = (item) => this.saveLottery(item);
  fetcherDelete: (id: string) => Observable<any> = (id) => this.deleteLottery(id)
  formABM: FormGroup;
  defaultForm = {
    name: null,
    nickname: null,
    color: null,
    status: null,
    bankings: null,
    limits: null,
    straightPlay: null,
    palePlay: null,
    tripletPlay: null,
    firstPrize: null,
    secondPrize: null,
    thirdPrize: null,
    doublePrize: null,
    palePrize: null,
    paleTwoThreePrize: null,
    tripletPrize: null,
    twoNumbersPrize: null,
    superPalePrize: null,
  };
  bankings: Banking[] = bankings;
  lotteries = lotteries;

  private getData(): Observable<any[]> {
    return new Observable(subscriber => subscriber.next(lotteries));
  }

  private saveLottery(item): Observable<any> {
    return new Observable(subscriber => subscriber.next(item));
  }

  private deleteLottery(id: string): Observable<any> {
    return new Observable(subscriber => subscriber.next(id));
  }
}
