import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogModalComponent } from './blog-modal.component';

describe('BlogModalComponent', () => {
  let component: BlogModalComponent;
  let fixture: ComponentFixture<BlogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogModalComponent]
    });
    fixture = TestBed.createComponent(BlogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
