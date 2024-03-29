import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolesInterceptor } from './roles.interceptor';
import { environment } from 'src/environments/environment';


export const httpInterceptorProviders = environment.jwtEnabled ?
  [{ provide: HTTP_INTERCEPTORS, useClass: RolesInterceptor, multi: true }] : [];
