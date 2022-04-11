import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { IAuthLoginResponse } from '../../models/auth-login-response';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: any;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password are wrong!';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
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
          this.localstorageService.setToken(res.token);
          this.router.navigate(['/']);
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
