import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-accounts',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private messageService: NzMessageService) {
    if (this.userService.isLogged()) {
      this.router.navigate(['dashboard']);
    }
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
        this.userService.isLoginEnabled().then(isEnabled => {
            this.loading = false;
            if (isEnabled) {
              this.navigate();
            } else {
              this.userService.logout();
            }
          }
        );
      }).catch(err => {
        this.loading = false;
        if (err.status === 0) {
          this.messageService.create('error', 'Sin coneccion');
        } else {
          this.messageService.create('error', 'Usuario o contraseña incorrectos');

        }
      });
    }
  }

  private navigate(): Promise<boolean> {
    /*let routeCommands;
    if (this.userService.checkRoles([User.RoleEnum.Banker])) {
      routeCommands = ['banker'];
    } else if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands = ['consortium'];
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands = ['admin'];
    } else {
      alert('No role');
    }
*/
    return this.router.navigate(['']);
  }
}
