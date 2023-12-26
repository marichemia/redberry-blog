import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category, CategoryRes } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<CategoryRes>('https://api.blog.redberryinternship.ge/api/categories')
      .pipe(
        map(response => response.data)
      )

  }
}



