import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthLoginResponse } from '../../models/auth-login-response';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password are wrong!';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) return;

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };


    this.isSubmitted = true;
    this.authService.login(loginData)
      .subscribe((res: IAuthLoginResponse) => {
        if (res.success) {
          this.authError = false;
          console.log(res.token);
        }
      },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.authError = true;

          if (error.status !== 400) {
            this.authMessage = 'Error in the server! Please try again later.';
          }
        }
      )
  }
}
