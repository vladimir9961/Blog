import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Blog } from 'src/app/shared/state/blogs/BlogsInitialState';
import { Observable } from 'rxjs';
import * as BlogActions from '../../shared/state/blogs/blogs.actions';
import * as BlogSelectors from '../../shared/state/blogs/blogs.selectors';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.blogs$ = this.store.select(BlogSelectors.selectBlogs);
    this.loading$ = this.store.select(BlogSelectors.selectLoading);
    this.error$ = this.store.select(BlogSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadBlogs());
  }
}
