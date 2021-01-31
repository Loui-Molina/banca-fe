import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import {LayoutModule} from './layout/layout.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Page404Component} from './pages/problems/404/page404.component';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {ErrorsHandler} from '../utils/ErrorsHandler';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {environment} from '../environments/environment';
import {BASE_PATH as BASE_PATH_API} from 'local-packages/banca-api';
import {NgxPermissionsModule} from 'ngx-permissions';
import {JWTUserService, MockUserService, UserService} from './services/user.service';
import {httpInterceptorProviders} from './interceptors';


registerLocaleData(es);

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    LayoutModule,
    RouterModule,
    AppRoutingModule,
    NzSwitchModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot()
  ],
  exports: [
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: BASE_PATH_API, useValue: environment.urlApi},
    {provide: ErrorHandler, useClass: ErrorsHandler},
    { provide: UserService, useClass: environment.jwtEnabled ? JWTUserService : MockUserService },
    httpInterceptorProviders,
    NzNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }

}

