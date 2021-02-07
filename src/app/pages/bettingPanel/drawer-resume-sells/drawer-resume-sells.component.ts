import {Component, Input, OnInit} from '@angular/core';
import {BettingPanelService, ResumeSellsDto} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-drawer-resume-sells',
  templateUrl: './drawer-resume-sells.component.html',
  styleUrls: ['./drawer-resume-sells.component.scss']
})

export class DrawerResumeSellsComponent implements OnInit {


  @Input() nzTitle: string;
  loading: boolean;
  resumeSells: ResumeSellsDto;
  nzVisible = false;

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  open(params): void{
    this.nzVisible = true;
    this.reloadResumeSells();
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.nzVisible = false;
  }

  private reloadResumeSells(): void {
    this.loading = true;
    this.bettingPanelService.bettingPanelControllerGetResumeSells().subscribe(data => {
      this.resumeSells = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
