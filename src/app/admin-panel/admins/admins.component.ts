import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL;

import { Admin } from './admin.model';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit {
  admins: Admin[];

  reponseMessage: {
    message: string;
    status: string;
  } = {
    message: '',
    status: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{
        admins: {
          email: string;
          dateAndTime: string;
          _id: string;
          __v: number;
        }[];
      }>(BACKEND_URL + 'admins/get-admins')
      .subscribe({
        next: (responseData) => {
          this.admins = responseData.admins.map((responseData) => {
            return {
              email: responseData.email,
              dateAndTime: responseData.dateAndTime,
            };
          });
        },
      });
  }

  onCreateAdmin(adminForm: NgForm): void {
    if (adminForm.invalid) return;

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();

    const admin = new Admin(
      adminForm.value.adminEmail,
      year + '-' + month + '-' + day
    );

    this.http
      .post<{ message: string; status: string }>(
        BACKEND_URL + 'auth/create-admin',
        {
          email: admin.email,
          dateAndTime: admin.dateAndTime,
        }
      )
      .subscribe({
        next: (responseData) => {
          this.http
            .get<{
              admins: {
                email: string;
                dateAndTime: string;
                _id: string;
                __v: number;
              }[];
            }>(BACKEND_URL + 'admins/get-admins')
            .subscribe({
              next: (responseData) => {
                this.admins = responseData.admins.map((responseData) => {
                  return {
                    email: responseData.email,
                    dateAndTime: responseData.dateAndTime,
                  };
                });
              },
            });

          this.reponseMessage.message = responseData.message;
          this.reponseMessage.status = responseData.status;
        },
        error: (err) => {
          this.reponseMessage.message = err.error.message;
          this.reponseMessage.status = err.status;
        },
      });
  }

  onDeleteAdmin(email: string): void {
    this.http
      .delete<{ message: string }>(BACKEND_URL + 'admins/delete-admin', {
        params: new HttpParams().set('email', email),
      })
      .subscribe({
        next: (responseData) => {
          this.http
            .get<{
              admins: {
                email: string;
                dateAndTime: string;
                _id: string;
                __v: number;
              }[];
            }>(BACKEND_URL + 'admins/get-admins')
            .subscribe({
              next: (responseData) => {
                this.admins = responseData.admins.map((responseData) => {
                  return {
                    email: responseData.email,
                    dateAndTime: responseData.dateAndTime,
                  };
                });
              },
            });
        },
        error: () => {},
      });
  }
}
