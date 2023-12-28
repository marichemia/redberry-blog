import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {

  constructor(private http: HttpClient) { }

  createBlog(data: any) {

    return this.http.post('https://api.blog.redberryinternship.ge/api/blogs', data);

  }
}
