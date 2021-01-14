import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-help',
  templateUrl: './admin-help.component.html',
  styleUrls: ['./admin-help.component.scss']
})
export class AdminHelpComponent implements OnInit {

  constructor(private translateService: TranslateService,
  ) {
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

  ngOnInit(): void {
  }
}
