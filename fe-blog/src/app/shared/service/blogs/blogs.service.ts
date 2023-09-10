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
}
