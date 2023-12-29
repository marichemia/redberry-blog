import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../core/interfaces/blog';
import { BlogsService } from '../core/services/blogs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  displayedBlog$!: Observable<Blog>;

  constructor(private route: ActivatedRoute, private blogService: BlogsService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id')?.substring(1);

    this.displayedBlog$ = this.blogService.getOne(id);

  }


}
