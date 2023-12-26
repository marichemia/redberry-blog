import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { Category } from '../core/interfaces/category';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesArr$: Observable<Category[]> | undefined = this.categoriesService.getCategories();
  selectedCategoriesArr: String[] | undefined = [];


  constructor(private categoriesService: CategoriesService, private router: Router) { }

  navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve'
  };

  ngOnInit() {
    this.categoriesArr$?.subscribe(data => console.log(data))
  }

  onCategoryClick(category: string) {
    let index = this.selectedCategoriesArr?.indexOf(category);

    if (index !== -1 && index !== undefined) {

      this.selectedCategoriesArr?.splice(index, 1);

    } else {

      this.selectedCategoriesArr?.push(category);

    }

    this.router.navigate(['/home'], { queryParams: { categories: this.selectedCategoriesArr?.join(',') } });
    localStorage.setItem('categories', JSON.stringify(this.selectedCategoriesArr));
    this.categoriesService.updatedSelectedCategories(this.selectedCategoriesArr);
  }

}
