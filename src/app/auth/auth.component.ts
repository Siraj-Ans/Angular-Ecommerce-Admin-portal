import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import jwt_decode from 'jwt-decode';

import { AuthService } from './auth.service';

import { DecodedCredentials } from './decoded-credentials.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  authError: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '567341419455-h5nmlnqn4qsjlb90kfs67opejt5ibceq.apps.googleusercontent.com',
        callback: this.handleCredentialsResponse.bind(this),
        auto_select: true,
        cancel_on_tap_outside: true,
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('googleButton'),
        {
          theme: 'outline',
          size: 'large',
          width: 100,
        },

        // @ts-ignore
        google.accounts.id.prompt(
          (notification: PromptMomentNotification) => {}
        )
      );
    };
  }

  async handleCredentialsResponse(response: CredentialResponse) {
    try {
      const decodedToken: DecodedCredentials = jwt_decode(response.credential);
      this.authService.login(decodedToken.email).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.authService.setUser(decodedToken, response.credential);
          this._ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.authService.isAuthenticated = true;
        },
        error: (err) => {
          this.authError = err.error.message;
        },
      });
    } catch (err) {
      return err;
    }
  }
}
