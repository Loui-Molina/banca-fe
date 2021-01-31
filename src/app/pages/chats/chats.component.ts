import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  BankingDto, BankingService,
  MessageDto,
  MessagesService,
  ResultDto,
} from 'local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';
import {User} from '@banca-api/model/user';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  defaultForm: FormGroup;
  user: UserInterface;
  userRole = User.RoleEnum;
  loading = false;
  form: FormGroup;
  messages: MessageDto[] = [];
  bankings: BankingDto[] = [];
  interval;

  constructor(private datePipe: DatePipe,
              private messageService: NzMessageService,
              private translateService: TranslateService,
              private modal: NzModalService,
              private messagesService: MessagesService,
              private bankingService: BankingService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.user = this.userService.getLoggedUser();
    this.form = this.formBuilder.group({
      message: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(99)]],
      destinationId: [null, (this.user?.role === this.userRole.Consortium) ? [Validators.required] : []],
    });
  }

  ngOnInit(): void {
    this.init();
    this.interval = setInterval(() => {
      this.reloadMessages();
    }, 15000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  reloadMessages(): void{
    this.messagesService.chatControllerGetAll().subscribe(data => {
      this.messages = data;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  init(): void {
    this.loading = true;
    this.messagesService.chatControllerGetAll().subscribe(data => {
      this.messages = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
    if (this.user?.role === this.userRole.Consortium) {
      this.bankingService.bankingsControllerFindAll().subscribe(data => {
        this.bankings = data;
        this.loading = false;
      }, error => {
        this.loading = false;
        throw new HttpErrorResponse(error);
      });
    }
  }

  submitMessage(): void{
    const { message, destinationId } = this.form.value;
    const body = {
      message,
      destinationId
    };
    this.loading = true;
    this.messagesService.chatControllerCreate(body).subscribe(data => {
      this.messageService.create('success', `Mensaje enviado correctamente`, {nzDuration: 3000});
      this.init();
      this.form.reset();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }

}
