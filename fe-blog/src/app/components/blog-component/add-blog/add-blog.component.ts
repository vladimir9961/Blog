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
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  constructor(private store: Store, private router: Router) {}
  onImageSelected(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.addPost.get('image')?.setValue(file);
    }
  }

  onSubmit() {
    if (this.addPost.valid) {
      const title = this.addPost.get('title')?.value || '';
      const content = this.addPost.get('content')?.value || '';
      const imageFile = this.addPost.get('image')?.value as File | null;

      if (imageFile instanceof File) {
        this.store.dispatch(
          AddBlogActions.addBlog({ title, content, image: imageFile })
        );
        this.router.navigateByUrl('/home');
      } else {
        console.log('Image is not a valid File object');
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
