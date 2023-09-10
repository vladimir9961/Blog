import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as BlogSelector from '../../../shared/state/blog/edit-blog/editBlog.selectors';
import {
  editPost,
  getPost,
} from 'src/app/shared/state/blog/edit-blog/editBlog.actions';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  blog$: Observable<Blog>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.blog$ = this.store.select(BlogSelector.selectBlog);
  }

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId !== null) {
      this.store.dispatch(getPost({ blogId }));
    }
  }

  saveBlog() {
    this.store.dispatch(
      editPost({ _id: 'test', title: 'test', content: '', imageUrl: '' })
    );
  }
}
