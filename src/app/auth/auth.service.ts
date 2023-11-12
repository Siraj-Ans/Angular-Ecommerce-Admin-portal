import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from './user.model';
import { DecodedCredentials } from './decoded-credentials.model';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'auth/';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  user: User;
  isAuthenticated: boolean;
  authenticationUpdated = new Subject<boolean>();
  timerRef: any;
  authToken: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _NgZone: NgZone
  ) {}

  ngOnInit(): void {
    this.authenticationUpdated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  public signOutExternal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    this.authenticationUpdated.next(false);

    this._NgZone.run(() => {
      this.router.navigateByUrl('auth');
    });
  };

  getUser(): User {
    return this.user;
  }

  setUser(decodedToken: any, token: string): void {
    this.authToken = token;

    const user = new User(
      decodedToken.email,
      token,
      decodedToken.name,
      decodedToken.picture,
      decodedToken.exp
    );

    const now = new Date();
    const expirationTime = 3500;
    const expirationDuration = new Date(now.getTime() + expirationTime);

    this.timerRef = setTimeout(() => {
      this.signOutExternal();
    }, expirationTime * 1000);

    localStorage.setItem('token', user.token);
    localStorage.setItem('tokenExpiration', expirationDuration.toISOString());

    this.user = user;
  }

  getAuthToken(): string {
    return this.authToken;
  }

  login(decodedCredentials: DecodedCredentials): Observable<any> {
    let params = new HttpParams().set('email', decodedCredentials.email);
    params = params.append('sub', decodedCredentials.sub);

    return this.http.get(BACKEND_URL + 'login', {
      params: params
    });
  }

  signUp(decodedCredentials: DecodedCredentials): void {
    this.http.post(BACKEND_URL + 'sign-up', {
      email: decodedCredentials.email,
      name: decodedCredentials.name,
      picture: decodedCredentials.picture,
      sub: decodedCredentials.sub,
    })
    .subscribe((responseData) => {
      console.log('responseData: ', responseData);
    })


  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }
}
