import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogout(): void {
    this.authService.isAuthenticated = false;
    localStorage.clear();

    this.router.navigate(['auth']);
  }
}
