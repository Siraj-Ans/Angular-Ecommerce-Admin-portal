import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user.model';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'auth/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User;
  isAuthenticated: boolean;

  constructor(private router: Router, private http: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['auth']);
  };

  getUser(): User {
    return this.user;
  }

  setUser(decodedToken: any, token: string): void {
    const user = new User(
      decodedToken.email,
      token,
      decodedToken.name,
      decodedToken.picture
    );

    this.user = user;
  }

  login(email: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'login', {
      params: new HttpParams().set('email', email),
    });
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }
}
