import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { Category } from '../core/interfaces/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  selectedFile: File | null | undefined;
  fileName: string | null | undefined;
  categoriesArr$: Observable<Category[]> | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.categoriesArr$ = this.categoriesService.getCategories();

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target?.files[0];
    this.fileName = this.selectedFile.name;
  }

  onDelete() {
    this.selectedFile = null;
    this.fileName = null;
    this.fileInput!.nativeElement.value = null;
  }

}
