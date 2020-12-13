import {Component, OnInit} from '@angular/core';
import {Column} from '../../components/abm/abm.component';
import {FormBuilder, FormGroup} from '@angular/forms';


interface Account {
  id: string;
  name: string;
  balance: number;
  address: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  listOfData: Account[] = [
    {
      id: '1',
      name: 'John Brown',
      balance: 10,
      address: 'New York No. 1 Lake Park'
    },
    {
      id: '2',
      name: 'Jim Green',
      balance: 500,
      address: 'London No. 1 Lake Park'
    },
    {
      id: '3',
      name: 'Joe Black',
      balance: 3200,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  columns: Column[] = [
    {key: 'name', title: 'Name'},
    {key: 'balance', title: 'Balance', type: 'numeric', prefix: '$', suffix: 'Dollars'},
    {key: 'address', title: 'Address', valueFormatter: (params, column) => this.cappitalize(params, column)},
  ];

  formABM: FormGroup;
  defaultForm = {
    id: '',
    name: '',
    address: ''
  };

  cappitalize = (params: Account, column: Column) => {
    return params.address.toUpperCase();
  }

  constructor(private formBuilder: FormBuilder) {
    this.formABM = this.formBuilder.group(this.defaultForm);
  }

  ngOnInit() {
  }

  onSubmit = (mode, cb, cbError) => {
    if (this.formABM.valid) {
      console.log('FORM', mode, this.formABM.value);
      if (mode === 'C') {
        this.listOfData = [...this.listOfData, this.formABM.value];
      } else {
        const aux = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listOfData.length; i++) {
          if (this.listOfData[i].id === this.formABM.value.id) {
            aux.push({...this.listOfData[i], ...this.formABM.value});
          } else {
            aux.push(this.listOfData[i]);
          }
        }
        this.listOfData = aux;
      }
      cb();
    } else {
      cbError();
    }
  }

}
