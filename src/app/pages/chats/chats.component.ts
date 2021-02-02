import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  BankingDto, BankingService,
  MessageDto,
  MessagesService,
  ResultDto, User,
} from 'local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface, UserService} from '../../services/user.service';

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
  destinationId;
  form: FormGroup;
  messages: MessageDto[] = [];
  bankings: BankingDto[] = [];
  interval;
  @ViewChild('chatContainer') chatContainer: ElementRef;

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
      message: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(300)]]
    });
  }

  ngOnInit(): void {
    this.init();
    this.interval = setInterval(() => {
      this.reloadMessages();
    }, 15000);
    if (this.user?.role === this.userRole.Banker){
      this.markAsReaded(this.destinationId);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  reloadMessages(): void{
    this.messagesService.chatControllerGetAll().subscribe(data => {
      let lastLength = 0;
      if (this.user?.role === this.userRole.Banker){
        lastLength = this.messages.length;
      } else {
        lastLength = this.messages.filter(value =>
          value.originId.toString() === this.destinationId.toString() ||
          value.destinationId.toString() === this.destinationId.toString()).length;
      }
      this.messages = data;
      let newLength = 0;
      if (this.user?.role === this.userRole.Banker){
        newLength = this.messages.length;
      } else {
        newLength = this.messages.filter(value =>
          value.originId.toString() === this.destinationId.toString() ||
          value.destinationId.toString() === this.destinationId.toString()).length;
      }
      if (lastLength !== newLength) {
        this.markAsReaded(this.destinationId);
        this.scrollAutomatic();
      }
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getMessages(): MessageDto[]{
    if (this.user?.role === this.userRole.Banker){
      return this.messages;
    } else {
      return this.messages.filter(value =>
        value.originId.toString() === this.destinationId.toString() ||
        value.destinationId.toString() === this.destinationId.toString());
    }
  }

  markAsReaded(id): void {
    const body = {
      originId: id
    };
    this.messagesService.chatControllerReadMessages(body).subscribe(data => {
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  onChangeDestination($event): void {
    this.markAsReaded($event);
    this.scrollAutomatic();
  }
  scrollAutomatic(): void {
    setTimeout(() => {
      if (this.chatContainer && this.chatContainer.nativeElement){
        this.chatContainer.nativeElement.scroll({ top: this.chatContainer.nativeElement.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
  }

  init(): void {
    this.loading = true;
    this.messagesService.chatControllerGetAll().subscribe(data => {
      this.messages = data;
      this.loading = false;
      this.scrollAutomatic();
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
    const { message } = this.form.value;
    const body = {
      message,
      destinationId: this.destinationId
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
