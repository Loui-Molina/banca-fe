import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Consortium, addConsortium} from '../../assets/data';
import {Router} from '@angular/router';
import {UserInterface, UserService} from '../services/user.service';
import {User} from '@banca-api/model/user';
import {DefaultService} from '../../../local-packages/banca-api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  langSelected = null;
  user: UserInterface;
  userRole = User.RoleEnum;

  constructor(
    private router: Router,
    private userService: UserService,
    private defaultService: DefaultService,
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
    this.initMockConsortiumData();
  }

  private initMockBankingData() {
    /*for (let i = 0; i < 4; i++) {
      let banking: Banking = new class implements Banking {
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

      // addBankings(banking);
    }*/

  }

  // tslint:disable-next-line:typedef
  private initMockConsortiumData() {
    for (let i = 0; i < 4; i++) {
      const cons: Consortium = new class implements Consortium {
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
      cons.name = 'Consorcio-' + (i + 1);

      cons.canceledTks = Math.floor(Math.random() * 10);
      cons.winningTks = Math.floor(Math.random() * 30);
      cons.losingTks = Math.floor(Math.random() * 90);
      cons.pendingTks = Math.floor(Math.random() * 80);
      cons.totalTickets = Math.floor(cons.canceledTks + cons.winningTks + cons.losingTks + cons.pendingTks);


      cons.earnings = Math.floor(cons.totalTickets * Math.random() * 1000);
      cons.prizes = Math.floor(cons.losingTks * Math.random() * 1000);
      cons.net = Math.floor(cons.earnings - cons.prizes);

      cons.percentage = Math.floor((Math.random() * 10) / 2);
      cons.discount = Math.floor((Math.random() * 10) / 2);

      cons.balance = Math.floor(cons.net + (cons.net * (cons.percentage / 100)) - (cons.net * (cons.discount / 100)));

      addConsortium(cons);
    }

  }

  logout(): void {
    this.defaultService.authControllerLogOut().subscribe(value => {
      console.log('Logout successfully');
    }, error => {
      console.log('Logout Err');
    })
    this.userService.logout();
    this.router.navigate(['login']);
  }
}

export interface MenuItem {
  text?: string;
  routerLink?: string[];
  hidden?: boolean;
  enable?: boolean;
  innerItems?: MenuItem[];
}
