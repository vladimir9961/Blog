import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AddBlogActions from '../state/add-blog/addBlog.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  addPost = new FormGroup({
    title: new FormControl('', [Validators.minLength(4)]),
    content: new FormControl('', [Validators.minLength(4)]),
  });

  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    if (this.addPost.valid) {
      const title = this.addPost.get('title')?.value || '';
      const content = this.addPost.get('content')?.value || '';

      this.store.dispatch(AddBlogActions.addBlog({ title, content }));
    } else {
      console.log('Form is not valid');
    }
  }
}
