import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'auth/';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent {
  reponseMessage: {
    message: string;
    status: string;
  } = {
    message: '',
    status: '',
  };

  constructor(private http: HttpClient) {}

  onCreateAdmin(adminForm: NgForm): void {
    if (adminForm.invalid) return;

    this.http
      .post<{ message: string; status: string }>(BACKEND_URL + 'create-admin', {
        email: adminForm.value.adminEmail,
      })
      .subscribe({
        next: (responseData) => {
          this.reponseMessage.message = responseData.message;
          this.reponseMessage.status = responseData.status;
        },
        error: (err) => {
          this.reponseMessage.message = err.error.message;
          this.reponseMessage.status = err.status;
        },
      });
  }
}
