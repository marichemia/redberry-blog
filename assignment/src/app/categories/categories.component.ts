import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { Category } from '../core/interfaces/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesArr$: Observable<Category[]> | undefined = this.categoriesService.getCategories();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    console.log(this.categoriesArr$)
    this.categoriesArr$?.subscribe(data => console.log(data))
  }

}
