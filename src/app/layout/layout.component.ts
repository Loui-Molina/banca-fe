import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  langSelected = null;

  constructor(
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.translate && this.translate.store) {
      this.langSelected = this.translate.store.currentLang;
    }
  }

  selectLanguage(lang: string): void {
    this.langSelected = lang;
    this.translate.use(lang);
  }

}
