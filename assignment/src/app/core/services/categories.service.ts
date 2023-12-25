import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {

    this.http.get('https://api.blog.redberryinternship.ge/api/categories').subscribe(data => console.log(data))

  }
}



