import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Category, CategoryRes } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private selectedCategories = new Subject<string[]>;
  selectedCategories$ = this.selectedCategories.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<CategoryRes>('https://api.blog.redberryinternship.ge/api/categories')
      .pipe(
        map(response => response.data)
      )

  }


  updatedSelectedCategories(categories: any) {
    console.log('updated' + categories)
    this.selectedCategories.next(categories);
  }
}



