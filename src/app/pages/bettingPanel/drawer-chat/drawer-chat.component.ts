import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BettingPanelService, MessageDto, MessagesService} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-drawer-chat',
  templateUrl: './drawer-chat.component.html',
  styleUrls: ['./drawer-chat.component.scss']
})

export class DrawerChatComponent implements OnInit, OnDestroy {


  @Input() nzTitle: string;
  form: FormGroup;
  interval;
  nzVisible = false;
  messages: MessageDto[] = [];
  loading = false;
  destinationId;
  @ViewChild('chatContainer') chatContainer: ElementRef;

  constructor(private bettingPanelService: BettingPanelService,
              private modalService: NzModalService,
              private translateService: TranslateService,
              private messagesService: MessagesService,
              private formBuilder: FormBuilder,
              private messageService: NzMessageService) {
    this.form = this.formBuilder.group({
      message: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(300)]]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  reloadMessages(): void{
    this.messagesService.chatControllerGetAll().subscribe(data => {
      const lastLength = this.messages.length;
      this.messages = data;
      const newLength =  this.messages.length;
      if (lastLength !== newLength) {
        this.markAsReaded(this.destinationId);
        this.scrollAutomatic();
      }
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getMessages(): MessageDto[]{
    return this.messages;
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

  open(params): void{
    this.nzVisible = true;
    this.init();
    this.interval = setInterval(() => {
      this.reloadMessages();
    }, 15000);
    this.markAsReaded(this.destinationId);
  }

  isVisible(): boolean{
    return this.nzVisible;
  }

  close(): void{
    this.nzVisible = false;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
