import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.checkAccess()) {
      return true;
    }

    this.redirectTo(state);
    return false;
  }

  redirectTo(state: RouterStateSnapshot): void {
    this.router.navigate(['login'], {
      queryParams: {
        returnUrl: state.url,
      },
    });
  }

  checkAccess(): boolean {
    if (this.authService.checkUser()) {
      return true;
    }
    return false;
  }
}
