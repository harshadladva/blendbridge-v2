import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { emailRegex, passwordRegex } from '../common/constants';

export const validateRequired =
  (field: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: boolean | string } | null => {
    if (!control.value) {
      return { error: true, message: field + ' is required' };
    }

    return null;
  };

export const validateEmail =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: boolean | string } | null => {
    if (!control.value) {
      return { error: true, message: 'Email is required' };
    }

    if (!emailRegex.test(control.value)) {
      return { error: true, message: 'Invalid Email' };
    }

    return null;
  };

export const validateConfirmPassword = (
  controlName: string,
  matchingControlName: string
) => {
  return (formGroup: FormGroup) => {
    const controlVal = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (controlVal.value !== matchingControl.value) {
      matchingControl.setErrors({
        error: true,
        message: "Password and Confirm Password doesn't match",
      });
    } else {
      matchingControl.setErrors(null);
    }
  };
};

export const validatePassword =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: boolean | string } | null => {
    const inputVal = control.value?.trim() || '';
    if (!inputVal) {
      return { error: true, message: 'Password is required' };
    }

    if (inputVal.length < 8) {
      return {
        error: true,
        message: 'Password should have minimum 8 characters',
      };
    }

    if (!passwordRegex.test(inputVal)) {
      return {
        error: true,
        message:
          'Password must contains a capital, a lowercase, a number letters',
      };
    }

    return null;
  };
