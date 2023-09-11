// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/shared/models/registration_model';
import { isAuthenticated } from 'src/app/components/user/state/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate() {
    {
      return this.store.select(isAuthenticated).pipe(
        map((authenticate) => {
          if (!authenticate) {
            return false;
          }
          return true;
        })
      );
    }
  }
}
