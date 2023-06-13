import { Component } from '@angular/core';
import { BaseComponent } from '../../../_base/_base.component';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from 'src/app/_validator/_validators';

export enum YesNoMaybe {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent {
  registerForm!: UntypedFormGroup;
  yesNoMaybeEnum = YesNoMaybe;
  archivingJobProfiles = [
    {
      key: 0,
      id: YesNoMaybe.YES,
      value: 'Yes'
    },
    {
      key: 1,
      id: YesNoMaybe.NO,
      value: 'No'
    },
    {
      key: 2,
      id: YesNoMaybe.MAYBE,
      value: 'Maybe'
    }
  ]

  constructor(private _formBuilder: UntypedFormBuilder) {
    super();
  }

  protected override onInit() {
    this._initializeForm();
    super.onInit();
  }

  _initializeForm() {
    this.registerForm = this._formBuilder.group({
      email: [, validateEmail()],
      password: [, validatePassword()],
      confirmPassword: [,],
      currentCompany: [, validateRequired('Current Company')],
      currentJobProfile: [, validateRequired('Current Job Profile')],
      nextCompany: [, validateRequired('Dream or Next Company')],
      dreamJobProfile: [, validateRequired('Dream Job Profile')],
      feelAchivingYourDreamJobOrNot: [YesNoMaybe.YES],
      whatNotWorkingInYourFavour: [],
      rateCompany: [1],
    });
  }

  get email(): UntypedFormControl {
    return this.registerForm.get('email') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.registerForm.get('password') as UntypedFormControl;
  }

  get confirmPassword(): UntypedFormControl {
    return this.registerForm.get('confirmPassword') as UntypedFormControl;
  }

  get currentCompany(): UntypedFormControl {
    return this.registerForm.get('currentCompany') as UntypedFormControl;
  }

  get currentJobProfile(): UntypedFormControl {
    return this.registerForm.get('currentJobProfile') as UntypedFormControl;
  }

  get nextCompany(): UntypedFormControl {
    return this.registerForm.get('nextCompany') as UntypedFormControl;
  }

  get dreamJobProfile(): UntypedFormControl {
    return this.registerForm.get('dreamJobProfile') as UntypedFormControl;
  }

  get feelAchivingYourDreamJobOrNot(): UntypedFormControl {
    return this.registerForm.get(
      'feelAchivingYourDreamJobOrNot'
    ) as UntypedFormControl;
  }

  get whatNotWorkingInYourFavour(): UntypedFormControl {
    return this.registerForm.get(
      'whatNotWorkingInYourFavour'
    ) as UntypedFormControl;
  }

  get rateCompany(): UntypedFormControl {
    return this.registerForm.get('rateCompany') as UntypedFormControl;
  }

  onRegister() {}
}
