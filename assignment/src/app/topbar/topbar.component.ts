import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  showModal: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.getAuthStatus().subscribe(bool => this.isAuthenticated = bool);

    this.authService.getShowAuthModal().subscribe(bool => this.showModal = bool);

  }

  openModal() {
    this.authService.setShowAuthModal(true);
  }


}
