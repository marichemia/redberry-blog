import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllBlogsRes, Blog } from '../interfaces/blog';
import { Observable, map } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getOne(id: any): Observable<Blog> {
    return this.http.get<Blog>(`https://api.blog.redberryinternship.ge/api/blogs/${id}`);
  }

  getAll(categories?: string[]): Observable<Blog[]> {

    if (categories) {
      return this.http.get<AllBlogsRes>('https://api.blog.redberryinternship.ge/api/blogs')
        .pipe(
          map((allBlogsRes: AllBlogsRes) => this.filterBlogs(allBlogsRes.data, categories))
        );
    } else {
      return this.http.get<AllBlogsRes>('https://api.blog.redberryinternship.ge/api/blogs')
        .pipe(
          map((allBlogsRes: AllBlogsRes) => this.filterBlogs(allBlogsRes.data))
        );
    }


  }

  private filterBlogs(blogs: Blog[], categories?: string[]): Blog[] {
    const currentDate = new Date().toISOString().split('T')[0];

    return blogs
      .filter(blog => blog.publish_date <= currentDate)
      .filter(blog => !categories || categories.some(category => blog.categories.some(cat => cat.title === category)))
      .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
  }
}
