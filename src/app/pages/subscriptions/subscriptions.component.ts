import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
  ) {
    this.formSubscription = this.formBuilder.group(
      {
        // TODO
      }
    );
  }

  columns = [
    {title: 'consorcio', key: ''},
    {title: 'deuda', key: '', alignment: 'RIGHT'},
    {title: 'fecha ultimo pago', key: ''},
    {title: 'num bancas', key: '', alignment: 'RIGHT'},
    {title: 'costo por banca', key: '', alignment: 'RIGHT'},
    {title: 'base mensual', key: '', alignment: 'RIGHT'}
  ];
  subscriptions: [] = [];
  drawerSubscriptions = false;
  formSubscription: FormGroup;

  ngOnInit(): void {
  }

  openDrawer = (drawerName: string) => {
    this[drawerName] = true;
  };

  closeDrawer = (drawerName: string) => {
    this[drawerName] = false;
  };
}
