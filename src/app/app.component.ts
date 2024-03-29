import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DefaultService} from '../../local-packages/banca-api';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    translate: TranslateService,
    private defaultService: DefaultService,
    private userService: UserService,
    private router: Router
  ) {
    let lang = localStorage.getItem('language');
    if (!lang){
      lang = 'es';
      localStorage.setItem('language', lang);
    }
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang(lang);
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/esp|en/) ? browserLang : lang);

    const isLogged = this.userService.isLogged();
    if (isLogged){
      defaultService.authControllerGetLoggedUser().subscribe(res => {
      }, error => {
        this.userService.logout();
        this.router.navigate(['login']);
      });
    }
  }
}
