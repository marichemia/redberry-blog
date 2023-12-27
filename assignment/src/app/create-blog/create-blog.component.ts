import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { Category } from '../core/interfaces/category';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    author: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[ა-ჰ\s]+$/), this.twoWordsValidator]],
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    date: [''],
    category: [[], Validators.required],
    email: ['']
  })

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

  onSubmit() {

  }

  twoWordsValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const words = value.split(/\s+/).filter(word => word.trim().length > 0);
    return words.length >= 2 ? null : { twoWordsValidation: true };
  }

}
