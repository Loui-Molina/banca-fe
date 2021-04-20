import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-accounts',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading: boolean;
  langSelected = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private translateService: TranslateService,
              private translate: TranslateService,
              private messageService: NzMessageService) {
    if (this.userService.isLogged()) {
      this.router.navigate(['dashboard']);
    }
    if (this.translate && this.translate.store) {
      this.langSelected = this.translate.store.currentLang;
    }
  }

  selectLanguage(lang: string): void {
    this.langSelected = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.userService.login(this.validateForm.value.username, this.validateForm.value.password).then(value => {
        this.loading = false;
        this.navigate();
      }).catch(err => {
        this.loading = false;
        if (err.status === 0) {
          this.messageService.create('error', this.ts('LOGIN.ERROR_WITHOUT_CONEXION'));
        } else {
          this.messageService.create('error', this.ts('LOGIN.ERROR_USERNAME_PASSWORD'));

        }
      });
    }
  }

  private navigate(): Promise<boolean> {
    return this.router.navigate(['']);
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}
