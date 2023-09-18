import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Blog } from '../state/blogs/BlogsInitialState';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
  addComment,
  getBlogById,
  getComments,
} from '../state/blogs/blogs.actions';
import { selectBlogData, selectComent } from '../state/blogs/blogs.selectors';
@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogModalComponent {
  isModalOpen = false;
  CommentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Input() blog: string = '';
  @Input() openModale: any;
  blog$: Observable<any>;
  comments$: Observable<any>;
  blogId: string = '';
  constructor(private store: Store) {
    this.comments$ = this.store.select(selectComent);
    this.blog$ = this.store.select(selectBlogData).pipe(
      map((blogData: any) => blogData.blog) // Izdvajamo samo podatke o blogu
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    const chg = changes['openModale'];
    if (chg.currentValue != undefined) {
      this.blogId = chg.currentValue;
      this.store.dispatch(getBlogById({ blogId: chg.currentValue }));
      this.store.dispatch(getComments({ blogId: chg.currentValue }));
    }
  }
  getBlog() {
    this.comments$.subscribe((data) => console.log(data));
  }
  onSubmit() {
    if (this.CommentForm.valid) {
      const comment = this.CommentForm.value.comment || '';

      this.store.dispatch(addComment({ blogId: this.blogId, text: comment }));
      this.store.dispatch(getComments({ blogId: this.blogId }));

      this.CommentForm.reset();
    }
  }
}
