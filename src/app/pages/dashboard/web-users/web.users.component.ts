import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardService, PlayedNumbersDto} from 'local-packages/banca-api';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard-webusers',
  templateUrl: './web.users.component.html',
  styleUrls: ['./web.users.component.scss']
})
export class WebUsersComponent implements OnInit {
  balance = 0;
  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.dashboardService.dashboardControllerGetWebUserWidgetsStatistics().subscribe(res => {
      this.balance = res.balance;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }
}
