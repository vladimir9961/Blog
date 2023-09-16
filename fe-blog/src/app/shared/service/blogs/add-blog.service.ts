import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AddBlogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBlog(
    data: {
      title: string;
      content: string;
    },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    return this.http.post(`${this.apiUrl}/posts`, data, { headers });
  }
}
