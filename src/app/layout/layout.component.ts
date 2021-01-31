import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {UserInterface, UserService} from '../services/user.service';
import {User} from '@banca-api/model/user';
import {AuthService, CommonService, MessageDto, MessagesService} from '../../../local-packages/banca-api';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  langSelected = null;
  user: UserInterface;
  userRole = User.RoleEnum;
  establishmentName: string;
  interval;
  messages: MessageDto[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private commonService: CommonService,
    private authService: AuthService,
    private messagesService: MessagesService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.translate && this.translate.store) {
      this.langSelected = this.translate.store.currentLang;
    }
    this.initData();
  }

  reloadMessages(): void{
    this.messagesService.chatControllerGetAllUnreadMessages().subscribe(data => {
      this.messages = data;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  getTopMessages(): MessageDto[] {
    return this.messages.slice(0, 5);
  }

  goToChat(): void{
    this.router.navigate(['chat']);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  selectLanguage(lang: string): void {
    this.langSelected = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  logout(): void {
    this.authService.authControllerLogOut().subscribe(value => {
      console.log('Logout successfully');
    }, error => {
      console.log('Logout Err');
    });
    this.userService.logout();
    this.router.navigate(['login']);
  }

  private initData(): void {
    this.user = this.userService.getLoggedUser();
    this.commonService.commonControllerGetEstablishmentName().subscribe(res => {
      this.establishmentName = res.name;
    }, error => {
      throw new HttpErrorResponse(error);
    });

    this.reloadMessages();
    this.interval = setInterval(() => {
      this.reloadMessages();
    }, 15000);
  }
}

export interface MenuItem {
  text?: string;
  routerLink?: string[];
  hidden?: boolean;
  enable?: boolean;
  innerItems?: MenuItem[];
}
