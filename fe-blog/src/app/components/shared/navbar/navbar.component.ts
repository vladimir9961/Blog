import { Component, HostListener } from '@angular/core';
import { AppState } from 'src/app/shared/models/registration_model';
import {
  isAuthenticated,
  selectUsername,
} from 'src/app/components/user/state/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { navbarAnimation } from '../../../shared/animations/navbar-out.animation';
import { autoLogout } from 'src/app/components/user/state/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [navbarAnimation],
})
export class NavbarComponent {
  navbarState = 'expanded';
  isAuthenticated!: Observable<boolean>;
  username!: Observable<any>;
  private lastScrollTop = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.username = this.store.select(selectUsername);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.navbarState = 'collapsed';
    } else {
      this.navbarState = 'expanded';
    }
    this.lastScrollTop = st;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
