import { Component, Input, OnChanges } from '@angular/core';
import { Blog } from '../state/blogs/BlogsInitialState';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss'],
  standalone: true,
})
export class BlogModalComponent implements OnChanges {
  @Input() blog: Blog | null = null;
  constructor() {}
  ngOnChanges() {
    console.log(this.blog);
  }
}
