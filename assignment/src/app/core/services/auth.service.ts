import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new Subject<boolean>();
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private showAuthModal = new Subject<boolean>();
  showAuthModal$ = this.showAuthModal.asObservable();

  constructor(private http: HttpClient) { }

  setAuthStatus(bool: boolean) {
    this.isAuthenticated.next(bool);
  }

  getAuthStatus() {
    return this.isAuthenticated$;
  }

  setShowAuthModal(bool: boolean) {
    this.showAuthModal.next(bool);
  }

  getShowAuthModal() {
    return this.showAuthModal$;
  }

  signIn(body: any) {
    return this.http.post('https://api.blog.redberryinternship.ge/api/login', body);
  }
}
