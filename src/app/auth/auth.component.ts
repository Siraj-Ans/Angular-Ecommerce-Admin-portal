import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'auth/';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  authError: string;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next: (user) => {
        this.http
          .get<{ email: string }>(BACKEND_URL + 'login', {
            params: new HttpParams().set('email', user.email),
          })
          .subscribe({
            next: (responseData) => {
              if (responseData.email) {
                localStorage.setItem('token', user.idToken);

                this.router.navigate(['']);
              } else this.router.navigate(['/auth']);
            },
            error: (err) => {
              this.authError = err.error.message;
            },
          });
      },
      error: (err) => {
        console.log('[Google Login] err: ', err);
      },
    });
  }
}
