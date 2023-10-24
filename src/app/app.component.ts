import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('adminpanelMenu', [
      state('closed', style({})),
      state(
        'open',
        style({
          width: '100vw',
          height: '100vh',
        })
      ),
      transition('closed => open', animate('150ms ease-in')),
      transition('open => closed', animate('150ms ease-in')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  state = 'closed';
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();

    this.authService.authenticationUpdated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  onDropdown(): void {
    console.log('trig');
    this.state = 'open';
    console.log(this.state);
  }

  onCloseDropDown(): void {
    this.state = 'closed';
  }
}
