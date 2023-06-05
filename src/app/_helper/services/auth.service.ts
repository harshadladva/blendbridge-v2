import { Injectable } from '@angular/core';
import { LocalStorageKeys } from 'src/app/common/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getEmail(): string {
    return localStorage.getItem(LocalStorageKeys.EMAIL) || '';
  }

  setEmail(email: string): void {
    localStorage.setItem(LocalStorageKeys.EMAIL, email);
  }

  isUserAuthenticated(): boolean {
    return !!this.getEmail();
  }
}
