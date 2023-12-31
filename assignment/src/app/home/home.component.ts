import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { BlogsService } from '../core/services/blogs.service';
import { AllBlogsRes, Blog } from '../core/interfaces/blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: string[] = [];
  showModal?: boolean;
  showHint: boolean = false;
  showSuccess: boolean = false;
  allBlogs$!: Observable<Blog[]>;
  form = this.fb.group({
    email: new FormControl('', [Validators.required, this.customEmailValidator])
  });

  selectedCategries: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder, private blogService: BlogsService) { }

  ngOnInit() {

    this.authService.getShowAuthModal().subscribe(bool => this.showModal = bool);

    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params['categories']) {
        this.categories = params['categories'].split(',');
        this.allBlogs$ = this.blogService.getAll(this.categories);
      } else {
        this.categories = [];
        this.allBlogs$ = this.blogService.getAll();
      }


    });

    this.allBlogs$ = this.blogService.getAll();


  }

  closeModal() {
    this.authService.setShowAuthModal(false);
  }

  signIn() {
    if (this.form.value.email) {
      this.authService.signIn(this.form.value).subscribe((res) => {
        this.showHint = false;
        this.showSuccess = true;
        this.authService.setAuthStatus(true);
      }, (error) => {
        this.showHint = true;
      })
    }

  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;

    if (email && !email.endsWith('@redberry.ge')) {
      return { invalidEmail: true };
    }

    return null;
  }

}
