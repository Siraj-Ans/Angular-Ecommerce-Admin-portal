import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'auth/';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent {
  contructor(private http: HttpClient) {}

  onCreateAdmin(adminForm: NgForm): void {
    if (adminForm.invalid) return;

    this.http
      .get(BACKEND_URL + 'login', { email: adminForm.value.admin })
      .subscribe(() => {});
  }
}
