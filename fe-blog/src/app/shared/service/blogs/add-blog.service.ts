import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddBlogService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createBlog(data: {
    title: string;
    content: string;
    image: File;
    token: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${data.token}`,
    });

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image, data.image.name);

    return this.http.post(`${this.apiUrl}/posts`, formData, { headers });
  }
}
