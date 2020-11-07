import { Component, OnInit } from '@angular/core';


interface Person {
  key: string;
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

  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      balance: 10,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      balance: 500,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      balance: 3200,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
