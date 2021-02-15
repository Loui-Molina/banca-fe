import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {NzNotificationDataOptions, NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {
  private static readonly defaultErrorTitle = 'ERROR.TITLE';
  private static readonly genericError = 'ERROR.SYSTEM_ERROR';
  private static readonly chunkFailedMatch = /.*Loading chunk [^\s]+ failed.*/;

  constructor(private translateService: TranslateService,
              private notification: NzNotificationService,
              private injector: Injector) {
  }

  // generic error handling, will handle exceptions and network errors
  // this method is called from angular, not thought to be called manually
  handleError(error: Error | HttpErrorResponse): void {
    console.log(error);
    if (!navigator.onLine && (error instanceof HttpErrorResponse || ErrorsHandler.chunkFailedMatch.test(error.message))) {
      // NOTE: this way we guess it is an offline
      this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.ERROR_OFFLINE');
      return;
    }
    if (error instanceof HttpErrorResponse) {
      const status = (error as HttpErrorResponse).status;
      switch (status) {
        case 403:
          this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.NOT_AUTHORIZED');
          this.injector.get(Router).navigate(['/'], {replaceUrl: true});
          return;
        case 413:
          this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.DIMENSION_ERROR');
          return;
        default:
          break;
      }

      switch (Math.floor(status / 100)) {
        // 4XX family errors
        case 4:
          if (error.error && error.error.message){
           this.notifyError(ErrorsHandler.defaultErrorTitle, error.error.message);
           return;
          }
          this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.SYSTEM_ERROR');
          return;
        // 5XX family errors
        case 5:
          if (error.error && error.error.message){
            this.notifyError(ErrorsHandler.defaultErrorTitle, error.error.message);
            return;
          }
          this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.SYSTEM_ERROR');
          return;
        // no errors
        default:
          this.notifyError(ErrorsHandler.defaultErrorTitle, 'ERROR.ERROR_UNRECOGNIZED');
          return;
      }
    } else {
      // NOTE: handle other errors here
    }
  }

  // application error handling
  // it should be called from user code
  handleAppError(title?: string, message?: string, ...args: any): void {
    console.log(`APP ERROR - [${title}] [${message}]`, args);
    this.notifyError(title || ErrorsHandler.defaultErrorTitle, message || ErrorsHandler.genericError, args);
  }

  private notifyError(title: string, message: string, args?: any[]): void {
    const options: NzNotificationDataOptions<any> = { nzPauseOnHover: true };
    this.notification.error(this.ts(title), this.ts(message, args), options);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
