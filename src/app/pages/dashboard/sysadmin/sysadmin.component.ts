import {Component, OnInit} from '@angular/core';
import {DashboardService} from 'local-packages/banca-api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-sysadmin',
  templateUrl: './sysadmin.component.html',
  styleUrls: ['./sysadmin.component.scss']
})
export class SysadminComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
