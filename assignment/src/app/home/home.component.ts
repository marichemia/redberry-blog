import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCategries: any;
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.selectedCategries = JSON.parse(localStorage.getItem('categories')!);

    //this.categoriesService.updatedSelectedCategories(this.selectedCategries);

    this.categoriesService.selectedCategories$.subscribe(categories => {
      console.log(categories);
      localStorage.setItem('categories', JSON.stringify(categories));
    })

  }

}
