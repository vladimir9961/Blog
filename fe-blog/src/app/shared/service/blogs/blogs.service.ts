import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }
}
