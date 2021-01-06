import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzMessageService} from 'ng-zorro-antd/message';

@NgModule({
  imports: [
    NzInputModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzFormModule,
    NzCheckboxModule,
    NzCardModule,
    NzButtonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [NzMessageService]
})
export class LoginModule { }
