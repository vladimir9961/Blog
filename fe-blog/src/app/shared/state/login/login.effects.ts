// effects.ts
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import * as loginActions from './login.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LoginService } from '../../service/login/login.service';

@Injectable()
export class LogginEffects {
  constructor(
    private actions$: Actions<Action>,
    private loginService: LoginService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      switchMap(({ userData }) =>
        this.loginService.login(userData).pipe(
          tap((action) => {
            localStorage.setItem('token', action.token);
            localStorage.setItem('userId', action.userId);
          }),
          map((user) => {
            return loginActions.loginSuccess({ user });
          }),
          catchError((error) => {
            console.error('HTTP Error:', error);
            return of(loginActions.loginFailure({ error }));
          })
        )
      )
    )
  );
}
