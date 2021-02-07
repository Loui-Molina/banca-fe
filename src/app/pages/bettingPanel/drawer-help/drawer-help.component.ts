import {Component, Input, OnInit} from '@angular/core';
import {BettingPanelService} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-drawer-help',
  templateUrl: './drawer-help.component.html',
  styleUrls: ['./drawer-help.component.scss']
})

export class DrawerHelpComponent implements OnInit {


  @Input() nzTitle: string;


  nzVisible = false;

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    this.nzVisible = true;
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.nzVisible = false;
  }


  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
