// effects.ts
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import * as loginActions from './login.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LoginService } from '../../service/login/login.service';
import { Router } from '@angular/router';

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
      switchMap(({ email, password }) =>
        this.loginService.login(email, password).pipe(
          tap((action) => {
            localStorage.setItem('token', action.token);
            localStorage.setItem('userId', action.userId);
          }),
          map((user) => {
            console.log(user);
            return loginActions.loginSuccess({
              email: user.email,
              token: user.token,
              userId: user.userId,
            });
          }),
          catchError((error) => {
            console.error('HTTP Error:', error);
            return of(loginActions.loginFailure({ error }));
          })
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActions.logout),
        tap((user) => {
          console.log(user);

          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
