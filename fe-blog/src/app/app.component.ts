import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './shared/state/login/login.actions';
import {
  selectUserId,
  selectToken,
} from './shared/state/login/login.selectors'; // Import the correct selectors

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userId$ = this.store.select(selectUserId); // Use store.select here
  token$ = this.store.select(selectToken); // Use store.select here

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.userId$.subscribe((userId) => {
      console.log('userId$', userId); // It should log `null`
    });

    this.token$.subscribe((token) => {
      console.log('token$', token); // It should log `null`
    });
    // userId$ and token$ observables will automatically update when the store state changes
    // You can subscribe to them here if you need to perform any additional actions
  }
}
