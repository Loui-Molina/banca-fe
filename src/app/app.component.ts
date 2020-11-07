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
    translate.addLangs(['en', 'fr', 'es', 'it']);
    translate.setDefaultLang('it');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|esp|it/) ? browserLang : 'it');
    translate.use('en'); //  QUITAR ESTO AL FINALIZAR TRADUCCIONES
  }


}
