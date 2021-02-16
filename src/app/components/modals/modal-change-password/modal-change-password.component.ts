import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {AuthPasswordService, ChangePasswordDto} from '../../../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {
  @Input()
  userId: object;

  password: string;
  password2: string;
  loading: boolean;

  constructor(private modal: NzModalRef,
              private translateService: TranslateService,
              private authPasswordService: AuthPasswordService,
              private messageService: NzMessageService)
  { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.destroyModal();
  }

  accept(): void {
    this.loading = true;
    const body: ChangePasswordDto = {
      _id: this.userId,

      newPassword: this.password,
      verifyPassword: this.password2
    };
    this.authPasswordService.authPasswordControllerChangePasswordFromWindows(body).subscribe(value => {
      this.loading = false;
      this.messageService.create('success', this.ts('UTILS.PASSWORD_SUCCESS'));
      this.destroyModal();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
