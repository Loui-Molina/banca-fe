import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {addBankings, consortium, banking} from '../../assets/data';
import NumberFormat = Intl.NumberFormat;
import {DecimalPipe} from '@angular/common';
import {MockUserService} from '../services/user.service';
import {User, UserRole} from '../../../local-packages/banca-api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  langSelected = null;
  user: User;
  userRole = UserRole;

  bankingMenu: MenuItem[];
  ConsortiumMenu: MenuItem[];
  AdminMenu: MenuItem[];

  constructor(
    private router: Router,
    private userService: MockUserService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.translate && this.translate.store) {
      this.langSelected = this.translate.store.currentLang;
    }
    this.initData();
  }

  selectLanguage(lang: string): void {
    this.langSelected = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  private initData(): void {
    this.user = this.userService.getLoggedUser();
    this.initMockBankingData();
  }

  private initMockBankingData() {
    for (let i = 0; i < 4; i++) {
      let banking: banking = new class implements banking {
        balance: number;
        canceledTks: number;
        discount: number;
        earnings: number;
        losingTks: number;
        name: string;
        net: number;
        pendingTks: number;
        percentage: number;
        prizes: number;
        totalTickets: number;
        winningTks: number;
      };

      banking.name = 'Banca-' + (i + 1);

      banking.canceledTks = Math.floor(Math.random() * 10);
      banking.winningTks = Math.floor(Math.random() * 30);
      banking.losingTks = Math.floor(Math.random() * 90);
      banking.pendingTks = Math.floor(Math.random() * 80);
      banking.totalTickets = Math.floor(banking.canceledTks + banking.winningTks + banking.losingTks + banking.pendingTks);


      banking.earnings = Math.floor(banking.totalTickets * Math.random() * 1000);
      banking.prizes = Math.floor(banking.losingTks * Math.random() * 1000);
      banking.net = Math.floor(banking.earnings - banking.prizes);

      banking.percentage = Math.floor((Math.random() * 10) / 2);
      banking.discount = Math.floor((Math.random() * 10) / 2);

      banking.balance = Math.floor(banking.net + (banking.net * (banking.percentage / 100)) - (banking.net * (banking.discount / 100)));

      console.log('banking ', banking);
      addBankings(banking);
    }

  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}

export interface MenuItem {
  text?: string
  routerLink?: string[]
  hidden?: boolean
  enable?: boolean
  innerItems?: MenuItem[]
}
