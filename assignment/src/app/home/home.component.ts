import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: string[] = [];

  selectedCategries: any;
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['categories']) {
        this.categories = params['categories'].split(',');
      } else {
        this.categories = [];
      }
    });
  }

}
