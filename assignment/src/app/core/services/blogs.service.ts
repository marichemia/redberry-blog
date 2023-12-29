import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllBlogsRes, Blog } from '../interfaces/blog';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<AllBlogsRes>('https://api.blog.redberryinternship.ge/api/blogs')
      .pipe(
        map((allBlogsRes: AllBlogsRes) => allBlogsRes.data)
      );
  }
}
