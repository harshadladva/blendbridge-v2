import { AbstractControl, ValidatorFn } from '@angular/forms';
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

export const validatePassword =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: boolean | string } | null => {
    if (!control.value) {
      return { error: true, message: 'Password is required' };
    }

    if (control.value.length < 8) {
      return {
        error: true,
        message: 'Password should have minimum 8 characters',
      };
    }

    if (!passwordRegex.test(control.value)) {
      return {
        error: true,
        message:
          'Password must contains a capital, a lowercase, a number letters',
      };
    }

    return null;
  };
