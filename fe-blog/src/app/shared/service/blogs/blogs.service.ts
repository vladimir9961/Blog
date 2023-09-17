import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/enviroment';
@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }
  dislakeBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${blogId}/like`);
  }
  likeBlog(blogId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${blogId}/like`, {});
  }
  addComment(blogId: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${blogId}/comments`, { text });
  }
}
