import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Blog } from 'src/app/shared/state/blog/blogs/BlogsInitialState';
import { Observable } from 'rxjs';
import * as BlogActions from '../../../shared/state/blog/blogs/blogs.actions';
import * as BlogSelectors from '../../../shared/state/blog/blogs/blogs.selectors';
import { Router } from '@angular/router';
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

  constructor(private store: Store, private router: Router) {
    this.blogs$ = this.store.select(BlogSelectors.selectBlogs);
    this.loading$ = this.store.select(BlogSelectors.selectLoading);
    this.error$ = this.store.select(BlogSelectors.selectError);
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadBlogs());
  }
  goToEditPage(id: string): void {
    console.log(id);
    this.router.navigate(['/posts/' + id]);
  }
}
