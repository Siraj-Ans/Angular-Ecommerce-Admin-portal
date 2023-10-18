import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isAuth = inject(AuthService).getIsAuth();

  if (!isAuth) {
    inject(Router).navigate(['auth']);
    return false;
  }

  return true;
};

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | Observable<boolean> | Promise<boolean> {
//     console.log('trig');
//     const isAuth = this.authService.getIsAuth();
//     if (!isAuth) {
//       this.router.navigate(['auth']);
//     }
//     return isAuth;
//   }
// }
