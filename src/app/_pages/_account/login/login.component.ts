import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/_base/_base.component';
import { AuthService } from 'src/app/_helper/services/auth.service';
import {
  validateEmail,
  validatePassword,
} from 'src/app/_validator/_validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  loginForm!: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    super();
  }

  protected override onInit(): void {
    this._initializeForm();
    super.onInit();
  }

  _initializeForm() {
    this.loginForm = this._formBuilder.group({
      email: [, validateEmail()],
      password: [, validatePassword()],
    });
  }

  get email(): UntypedFormControl {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.loginForm.get('password') as UntypedFormControl;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this._authService.setEmail(this.email.value);
    this._router.navigate(['/']);
  }
}
