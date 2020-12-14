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
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/esp|en/) ? browserLang : 'es');
    translate.use('es'); //  QUITAR ESTO AL FINALIZAR TRADUCCIONES
  }


}
