import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    translate: TranslateService) {
    let lang = localStorage.getItem('language');
    if (!lang){
      lang = 'es';
      localStorage.setItem('language', lang);
    }
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang(lang);
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/esp|en/) ? browserLang : lang);
  }
}
