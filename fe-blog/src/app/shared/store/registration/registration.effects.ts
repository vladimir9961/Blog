// effects.ts
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegistrationActions from './registration.actions';
import { RegistrationService } from '../../service/registration-service.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

@Injectable()
export class RegistrationEffects {
  constructor(
    private actions$: Actions<Action>,
    private registrationService: RegistrationService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.register),
      switchMap(({ userData }) =>
        this.registrationService.register(userData).pipe(
          map((user) => {
            // Log the response
            console.log('HTTP Response:', user);

            return RegistrationActions.registerSuccess({ user });
          }),
          catchError((error) => {
            // Log any errors
            console.error('HTTP Error:', error);
            return of(RegistrationActions.registerFailure({ error }));
          })
        )
      )
    )
  );
}
