import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EditBlogService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getBlog(blogId: string) {
    return this.http.get(`${this.apiUrl}/post/${blogId}`);
  }

  editBlog(body: any): Observable<any> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.http.put(
      `${this.apiUrl}/posts/64fc929e18e4d343a4e1fdb7`,
      body,
      { headers }
    );
  }
}
