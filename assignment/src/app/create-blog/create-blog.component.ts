import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { Category } from '../core/interfaces/category';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateBlogService } from '../core/services/create-blog.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  selectedFile: any;
  fileName: string | null | undefined;
  categoriesArr$: Observable<Category[]> | undefined;
  categoriesArr: String[] | undefined;
  selectedOptions: Category[] = [];
  selectedValue: Category | undefined | null;
  showModal: boolean | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  modalContent: { title: string; content: string; } | undefined;

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder, private createBlogService: CreateBlogService, private modalService: ModalService) { }

  form: FormGroup = this.fb.group({
    image: [null, Validators.required],
    author: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[ა-ჰ\s]+$/), this.twoWordsValidator]],
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    date: [''],
    categories: [[], Validators.required],
    email: ['', [this.customEmailValidator]]
  })

  ngOnInit() {

    this.categoriesArr$ = this.categoriesService.getCategories();

    this.modalService.showModal$.subscribe((isOpen) => {
      this.showModal = isOpen;
    });

    this.modalService.modalContent$.subscribe((content) => {
      this.modalContent = content;
    });


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

  onSelectionChange(event: any) {

    const selectedCategory = JSON.parse(event.target.value) as Category;
    if (selectedCategory && !this.selectedOptions.includes(selectedCategory)) {
      this.selectedOptions.push(selectedCategory);
    }


  }

  removeOption(option: Category) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option)
  }

  onSubmit() {

    const categoryIds = this.selectedOptions.map(option => option.id);

    const formData = new FormData();

    formData.append('title', this.form.controls['title'].value);
    formData.append('description', this.form.controls['description'].value);
    formData.append('author', this.form.controls['author'].value);
    formData.append('publish_date', this.form.controls['date'].value);
    formData.append('image', this.selectedFile, this.selectedFile?.name);
    formData.append('categories', JSON.stringify(categoryIds));
    if (this.form.controls['email'].value) {
      formData.append('email', this.form.controls['email'].value);
    }

    this.createBlogService.createBlog(formData).subscribe(
      (data) => {
        this.modalService.setContent({ title: 'title', content: '<p>Blog created successfully!</p>' });
        this.modalService.openModal();
      },
      (error) => {
        console.log(error);
      }
    );

    //form data for POST

    /*const data = {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      image: this.form.get('image')?.value,
      author: this.form.controls['author'].value,
      publish_date: this.form.controls['date'].value,
      categories: categoryIds,
      email: this.form.controls['email'].value
    }
    console.log('final data')
    console.log(data)

    //POST

    this.createBlogService.createBlog(data).subscribe(data => console.log(data))*/
  }

  twoWordsValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const words = value.split(/\s+/).filter(word => word.trim().length > 0);

    return words.length >= 2 ? null : { twoWordsValidation: true };
  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;

    if (email && !email.endsWith('@redberry.ge')) {
      return { invalidEmail: true };
    }

    return null;
  }


}
