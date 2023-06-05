import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const urlTree = this.router.parseUrl(state.url);
    urlTree.queryParams = {};
    urlTree.fragment = null;

    if (this._authService.isUserAuthenticated()) {
      const restrictedArray = ['/login', '/forgotpassword', '/resetpassword'];

      if (restrictedArray.includes(urlTree.toString())) {
        this.router.navigate(['/']);
        return false;
      }
    }

    if (!this._authService.isUserAuthenticated()) {
      const restrictedArray = ['/'];

      if (restrictedArray.includes(urlTree.toString())) {
        this.router.navigate(['login']);
        return false;
      }
    }

    return true;
  }
}
