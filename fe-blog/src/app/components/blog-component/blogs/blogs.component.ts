import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import * as BlogSelectors from '../state/blogs/blogs.selectors';
import { Router } from '@angular/router';
import { Blog, Likes } from 'src/app/shared/models/blog.model';
import { UserService } from 'src/app/shared/service/user/user.service';
import * as BlogActions from '../state/blogs/blogs.actions';
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
  onCheckboxChange(event: any, blogId: string) {
    const isChecked = event.target.checked;
    if (isChecked === false) {
      console.log(isChecked, blogId);
      this.store.dispatch(BlogActions.dislikeBlog({ blogId }));
    } else {
      console.log(isChecked, blogId);
      this.store.dispatch(BlogActions.likeBlog({ blogId }));
    }
  }
  goToEditPage(id: string): void {
    this.router.navigate(['/posts/' + id]);
  }
}
