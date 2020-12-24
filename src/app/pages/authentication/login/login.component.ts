import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MockUserService} from '../../../services/user.service';
import {UserRole} from '../../../../../local-packages/banca-api';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-accounts',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: MockUserService,
              private messageService: NzMessageService) {
    if (this.userService.isLogged()){
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
      this.userService.login(this.validateForm.value.username,
        this.validateForm.value.password);
      if (this.userService.isLogged()){
        this.navigate();
      } else {
        this.messageService.create('error', 'Usuario o contraseña incorrectos');
      }
    }
  }

  private navigate() {
    let routeCommands;
    if (this.userService.checkRoles([UserRole.banker])) {
      routeCommands = ['banker'];
    } else if (this.userService.checkRoles([UserRole.consortium])) {
      routeCommands = ['consortium'];
    } else if (this.userService.checkRoles([UserRole.admin])) {
      routeCommands = ['admin'];
    }
    return this.router.navigate(['']);
  }
}
