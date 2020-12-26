import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Banking} from "../../../assets/data";

@Component({
  selector: 'app-results',
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
      title: 'Loteria',
      key: '',
      valueFormatter: () => this.datePipe.transform(new Date())
    },
    {
      title: '1er',
      key: 'name',
      valueFormatter: () => Math.floor(Math.random() * 100)
    },
    {
      title: '2do',
      key: '',
      valueFormatter: () => Math.floor(Math.random() * 100)
    },
    {
      title: '3ro',
      key: '',
      valueFormatter: () => Math.floor(Math.random() * 100)
    },
    {
      title: 'Fecha',
      key: '',
      valueFormatter: () => new Date()
    }
  ];
  fetcher: Observable<any[]> = this.getData();
  defaultForm = {
    first: null,
    second: null,
    third: null,
    name: null,
    date: new Date()
  };
  formABM: FormGroup;
  fetcherSave: (item) => Observable<Banking> = (item) => this.saveResult(item);
  fetcherDelete: (id: string) => Observable<Banking> = (id) => this.deleteBanking(id);


  private deleteBanking(id: string) {
    return undefined;
  }

  private getData() {
    return undefined;
  }

  private saveResult(item) {
    return undefined;
  }
}
