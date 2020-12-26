import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {addBankings, Banking, bankings} from "../../../assets/data";

@Component({
  selector: 'app-bankings',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private datePipe: DatePipe,
              private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);

  }

  columns = [
    {
      title: 'Banca',
      key: 'name'
    },
    {
      title: 'Usuario',
      key: '',
      valueFormatter: () => 'X'
    },
    {
      title: 'Creacion',
      key: '',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Inicio Operacion',
      key: '',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: 'Estado',
      key: '',
      valueGetter: () => 1,
      valueFormatter: () => 'Operando'
    }
  ];
  fetcher: Observable<any[]> = this.getData();
  defaultForm = {
    name: null,
    phone: null,
    email: null,
    status: null,
    porcCuadreCaja: null,
    language: 'ES',
    user: 'X'
  };
  formABM: FormGroup;
  fetcherSave: (item) => Observable<Banking> = (item) => this.saveBanking(item);
  fetcherDelete: (id: string) => Observable<Banking> = (id) => this.deleteBanking(id);

  private getData(): Observable<Banking[]> { // TODO REPLACE
    return new Observable(subscriber => {
      subscriber.next(bankings);
    });
  }

  private deleteBanking(id: string): Observable<Banking> {
    return new Observable(subscriber => {
      subscriber.next(bankings[0]);
      subscriber.complete();
    });
  }

  private saveBanking(item): Observable<Banking> {
    const banking: Banking = {
      balance: 0,
      canceledTks: 0,
      discount: 0,
      earnings: 0,
      losingTks: 0,
      net: 0,
      pendingTks: 0,
      percentage: 0,
      prizes: 0,
      totalTickets: 0,
      winningTks: 0,
      name: item.name,
      phone: item.phone,
      email: item.email,
      status: item.status,
      language: item.language,
      user: item.user
    };
    addBankings(banking);
    return new Observable(subscriber => {
      subscriber.next(banking);
      subscriber.complete();
    });
  }
}
