import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MockUserService} from "../../../services/user.service";


@Component({
  selector: 'app-accounts',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: MockUserService) {
    userService.logout();
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
      this.userService.isLogged().then(value => (value) ? this.router.navigate(['']) : undefined).catch(reason => console.log(reason));
    }
  }
}
