import {
  Component,
  NgZone,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('gbutton') gbutton: ElementRef = new ElementRef({});

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
        this.gbutton.nativeElement,
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
    if(response.select_by === "user") {
      try {
        const decodedToken: DecodedCredentials = jwt_decode(response.credential);
        this.authService.login(decodedToken).subscribe({
          next: () => {
            this.authService.authenticationUpdated.next(true);
  
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
    } else {
      const decodedcredentials: DecodedCredentials = jwt_decode(response.credential);
      this.authService.signUp(decodedcredentials);
    }
    
  }
}
