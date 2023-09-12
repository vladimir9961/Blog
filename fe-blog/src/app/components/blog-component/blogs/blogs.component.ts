import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BlogSelectors from '../state/blogs/blogs.selectors';
import { Router } from '@angular/router';
import { Blog } from 'src/app/shared/models/blog.model';
import { UserService } from 'src/app/shared/service/user/user.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userId: string | null;

  constructor(
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {
    this.blogs$ = this.store.select(BlogSelectors.selectBlogs);
    this.loading$ = this.store.select(BlogSelectors.selectLoading);
    this.error$ = this.store.select(BlogSelectors.selectError);
    this.userId = this.userService.getUserId();
  }

  ngOnInit(): void {}

  goToEditPage(id: string): void {
    console.log(id);
    this.router.navigate(['/posts/' + id]);
  }
}
