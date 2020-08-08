// *********************************************************
// Copyright (c) 2017 Agra Technologies Pvt. Ltd.. All rights reserved
// *********************************************************
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private router: Router) {}

  /** If server or client error then show error and redirect to login  */
  getCheckError(error) {
    // if error then redirect to login
    if (error.status >= 400) {
      this.router.navigate(['/login']);
      return throwError(false);
    } else {
      const errMsg = error.message
        ? error.message
        : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
      // console.error(errMsg);
      return throwError(errMsg);
    }
  }

  // this retrieves the token from localstorage
  getToken() {
    return localStorage.getItem('JWT');
  }
}
