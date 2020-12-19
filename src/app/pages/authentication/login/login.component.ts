import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-accounts',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {

      debugger
      let actualUser = null;
      let username = this.validateForm.value.username;
      let password = this.validateForm.value.password;
      environment.users.forEach(value => {
          if (value.username === username && value.password === password) {
            actualUser = value
          }
        }
      )
      if (actualUser) {
        localStorage.setItem('actualUser', actualUser.toString())
        this.router.navigate(['']);
      }else{
        //TODO THROW ERROR
      }
    }
  }
}
