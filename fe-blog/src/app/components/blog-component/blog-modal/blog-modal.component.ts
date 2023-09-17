import { Component, Input } from '@angular/core';
import { Blog } from '../state/blogs/BlogsInitialState';
import { CommonModule } from '@angular/common';
import { Comment } from 'src/app/shared/models/blog.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addComment } from '../state/blogs/blogs.actions';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class BlogModalComponent {
  CommentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Input() blog: Blog | null = null;
  @Input() comments: Comment[] = [];
  constructor(private store: Store) {}

  onSubmit() {
    if (this.CommentForm.valid) {
      const comment = this.CommentForm.value.comment || '';
      const blogId = this.blog ? this.blog.post_id : '';
      this.store.dispatch(addComment({ blogId: blogId, text: comment }));
      console.log(this.blog?.post_id);
      this.CommentForm.reset();
    }
  }
}
