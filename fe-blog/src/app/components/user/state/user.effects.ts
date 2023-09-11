// effects.ts
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  switchMap,
  exhaustMap,
  mergeMap,
} from 'rxjs/operators';
import { of, tap } from 'rxjs';
import * as loginActions from './user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LoginService } from '../../../shared/service/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/login/user.model';

@Injectable()
export class LogginEffects {
  constructor(
    private actions$: Actions<Action>,
    private loginService: LoginService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      exhaustMap((action) => {
        return this.loginService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.loginService.formatUser(data);
            this.loginService.setUserInLocalStorage(user);
            this.router.navigate(['home']);
            return loginActions.loginSuccess({ user, redirect: true });
          })
        );
      })
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.register),
      switchMap(({ userData }) =>
        this.loginService.register(userData).pipe(
          map((user) => {
            return loginActions.registerSuccess({ user });
          }),
          catchError((error) => {
            console.error('HTTP Error:', error);
            return of(loginActions.registerFailure({ error }));
          })
        )
      )
    )
  );
  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.autoLogin),
      mergeMap(() => {
        const user = this.loginService.getUserFromLocalStorage();
        return of(loginActions.loginSuccess({ user, redirect: false }));
      })
    );
  });
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginActions.autoLogout),
        map((action) => {
          this.loginService.logout();
          this.router.navigate(['login']);
        })
      );
    },
    { dispatch: false }
  );
}
