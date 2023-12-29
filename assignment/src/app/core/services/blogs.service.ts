import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllBlogsRes } from '../interfaces/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AllBlogsRes> {
    return this.http.get<AllBlogsRes>('https://api.blog.redberryinternship.ge/api/blogs');
  }
}
