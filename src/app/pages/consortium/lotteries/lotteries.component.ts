import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {lotteries} from "../../../../assets/data";

@Component({
  selector: 'app-lotteries',
  templateUrl: './lotteries.component.html',
  styleUrls: ['./lotteries.component.scss']
})
export class LotteriesComponent {

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
      key: 'name'
    },
    {
      title: 'Nombre',
      key: 'name'
    }, {
      title: 'Nombre',
      key: 'name'
    },];
  fetcher: Observable<any[]> = this.getData();
  fetcherSave: (item) => Observable<any> = (item) => this.saveLottery(item);
  fetcherDelete: (id: string) => Observable<any> = (id) => this.deleteLottery(id)
  formABM: FormGroup;
  defaultForm = {
    name: null,
    nickname: null,
    color: null,
    status: null,
    bankings: 'ALL'
  };

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
